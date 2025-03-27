---
title:   Understanding Optimism's Batch Submission Architecture
date:   2025-03-27 
description: How Optimism handles optimism roll-ups to secure massive transactions
---


Recently, I dove deep into Optimism's inner workings, especially around how it handles **batch submission from L2 to L1**. If you're curious about what's happening under the hood when you send a transaction on Optimism, buckle up. Let's unpack the architecture, timing, and failure handling of batches in Optimism.

## Optimism Layer 2 Chain

Optimism is a Layer 2 scaling solution for Ethereum, built to improve transaction throughput and reduce fees while inheriting the security of Ethereum's base layer (Layer 1). It uses a technology called Optimistic Rollup, which batches many L2 transactions and posts them to L1 under the assumption that they're valid unless proven otherwise. This "optimistic" approach enables fast and cheap transactions while still preserving decentralization and trustlessness.

## What Is a Batch in Optimism?

Optimism opts for an **Optimistic Rollup**. This means that L2 transactions aren't directly finalized on Ethereum (L1), but are instead **bundled together in batches**, and then **submitted to L1** as a single transaction with calldata. This saves gas and improves scalability.

Optimistic Rollups operate under the assumption that all submitted transactions are valid, hence the name “optimistic.” Instead of verifying every transaction on-chain, they allow for a challenge period during which anyone can submit a fraud proof if they detect an invalid state transition. This approach significantly reduces computation on L1 while still preserving security through the possibility of dispute.

Each batch is essentially:
- A compressed bundle of multiple L2 transactions
- Submitted as an L1 Ethereum transaction (with its own L1 txn hash)
- Subject to validation and, eventually, challenge


![optimism_batch](/articles/batch_31059.png)
[See batch on website](https://optimism.blockscout.com/batches/31059?tab=index)

---

## How Often Are Batches Submitted? 🎉

The batch submission frequency varies based on network conditions, but generally:

- Batches are submitted **every 1 to 5 minutes**
- If there's a **high transaction volume**, batches might be sent more frequently
- The **number of txs per batch** can vary depending on throughput, gas, and network congestion

For example, batch #31059 contained only a few transactions, while recent batches can contain over **6000 txs**.

---

## Can a Batch Submission Fail? 😩

**Yes**, but it’s rare. And Optimism is designed to handle it gracefully.

### Possible Failure Cases:

1️⃣ **Invalid calldata**

   - If the calldata is improperly constructed due to issues like signature errors, formatting issues, or incorrect transaction ordering.
   - These issues usually don’t happen at the protocol level unless the batch submitter is using faulty logic, so the likelihood is low.

2️⃣ **Failure to submit calldata to L1**
   - Happens when too many transactions cause the calldata size to exceed L1 limits.
   - Or if there's not enough gas to submit the batch transaction.
   - → In this case, the batch poster will simply fail to send the L1 tx and will **automatically retry**.

3️⃣ **Successful Challenge (Fraud-Proof)**
   - Due to the nature of rollups, anyone can submit a fraud proof to challenge a submitted transaction result.
   - If the state root processed on L2 is invalid, the challenge succeeds and the state gets rolled back on L1.
   - Optimism is currently **testing its fault-proof system (as of 2024)**, and it's expected to enter production soon.

---

## 🛡️ How Optimism Prevents Batch Failures


**Minimal On-chain Trust**  
   Only the result of L2 transaction processing is submitted to L1.  
   If the batch doesn't follow the required formatting, signature, or compression rules, it's rejected at the L1 level → effectively prevented at the operator level.

**Batch Poster Node Verification Logic**  
   The node responsible for posting the batch validates the tx state and only sends calldata that passes the `validity checks`.  
   Internally, it uses a pre-submit validator to check the L2 state root.

**L1 and L2 State Root Consistency Guarantee**  
   The resulting state changes on L2 are summarized in a state root and posted to L1.  
   Once the fraud-proof system is live, it will allow verification and rollback based on these roots.

**Retryable Architecture**  
   Even if batch submission fails, it's simply a transaction submission failure → the node can retry the same batch.  
   Users are barely affected. The transaction is already processed on L2; only L1 confirmation is delayed.

---

---

## BatchSubmitter: The Code Behind It All ⛓️

The core batch submission logic lives in `op-batcher`, specifically in the `BatchSubmitter` struct. Here's what it looks like:
You can find the source code here: [source](https://github.com/ethereum-optimism/optimism)

```go
// DriverSetup is the collection of input/output interfaces and configuration that the driver operates on.
type DriverSetup struct {
	Log               log.Logger
	Metr              metrics.Metricer
	RollupConfig      *rollup.Config
	Config            BatcherConfig
	Txmgr             txmgr.TxManager
	L1Client          L1Client
	EndpointProvider  dial.L2EndpointProvider
	ChannelConfig     ChannelConfigProvider
	AltDA             *altda.DAClient
	ChannelOutFactory ChannelOutFactory
	ActiveSeqChanged  chan struct{} // optional
}

// BatchSubmitter encapsulates a service responsible for submitting L2 tx
// batches to L1 for availability.
type BatchSubmitter struct {
	DriverSetup

	wg                               *sync.WaitGroup
	shutdownCtx, killCtx             context.Context
	cancelShutdownCtx, cancelKillCtx context.CancelFunc

	mutex   sync.Mutex
	running bool

	txpoolMutex       sync.Mutex // guards txpoolState and txpoolBlockedBlob
	txpoolState       TxPoolState
	txpoolBlockedBlob bool

	channelMgrMutex sync.Mutex // guards channelMgr and prevCurrentL1
	channelMgr      *channelManager
	prevCurrentL1   eth.L1BlockRef // cached CurrentL1 from the last syncStatus
}

```

The `core` function that kicks off all logic is:
```go
func (l *BatchSubmitter) StartBatchSubmitting() error {
l.Log.Info("Starting Batch Submitter")

	l.mutex.Lock()
	defer l.mutex.Unlock()

	if l.running {
		return errors.New("batcher is already running")
	}
	l.running = true

	l.shutdownCtx, l.cancelShutdownCtx = context.WithCancel(context.Background())
	l.killCtx, l.cancelKillCtx = context.WithCancel(context.Background())
	l.clearState(l.shutdownCtx)
	l.wg = &sync.WaitGroup{}

	if err := l.waitForL2Genesis(); err != nil {
		return fmt.Errorf("error waiting for L2 genesis: %w", err)
	}

	if l.Config.WaitNodeSync {
		err := l.waitNodeSync()
		if err != nil {
			return fmt.Errorf("error waiting for node sync: %w", err)
		}
	}

	receiptsCh := make(chan txmgr.TxReceipt[txRef])

	l.txpoolState = TxpoolGood // no need to lock mutex as no other routines yet exist

	// Channels used to signal between the loops
	pendingBytesUpdated := make(chan int64, 1)
	publishSignal := make(chan struct{})

	// DA throttling loop should always be started except for testing (indicated by ThrottleThreshold == 0)
	if l.Config.ThrottleThreshold > 0 {
		l.wg.Add(1)
		go l.throttlingLoop(l.wg, pendingBytesUpdated) // ranges over pendingBytesUpdated channel
	} else {
		l.Log.Warn("Throttling loop is DISABLED due to 0 throttle-interval. This should not be disabled in prod.")
	}

	l.wg.Add(3)
	go l.receiptsLoop(l.wg, receiptsCh)                                            // ranges over receiptsCh channel
	go l.publishingLoop(l.killCtx, l.wg, receiptsCh, publishSignal)                // ranges over publishSignal, spawns routines which send on receiptsCh. Closes receiptsCh when done.
	go l.blockLoadingLoop(l.shutdownCtx, l.wg, pendingBytesUpdated, publishSignal) // sends on pendingBytesUpdated (if throttling enabled), and publishSignal. Closes them both when done

	l.Log.Info("Batch Submitter started")
	return nil
}
```

It launches several goroutines:
<table>
<thead><tr><th>Goroutine</th><th>Role</th></tr>
<tbody><tr>
    <td><code>blockLoadingLoop()</code></td>
<td> Loads L2 blocks to prepare them for submission </td>
    </tr>
<tr>
    <td><code>publishingLoop()</code></td>
    <td>Submits the L2 data to L1</td>
    </tr>
<tr>
    <td><code>receiptsLoop()</code></td>
    <td>Tracks tx receipt statuses </td>
    </tr>
<tr>
    <td><code>throttlingLoop()</code>
</td>
    <td>Prevents overwhelming the `codeee` network</td>
    </tr>
</tbody>
</table>

These loops ensure the system is always working in the background, grabbing new L2 blocks and sending them to L1. This function starts the batch submission system and launches several background loops that run concurrently.


## 📦 3. What Is Batch Submission? `publishStateToL1()`

This is the process of gathering multiple blocks from L2 → converting them into transaction data (`txData`) → and sending that to L1.

```go
// publishStateToL1 queues up all pending TxData to be published to the L1, returning when there is no more data to
// queue for publishing or if there was an error queing the data.
func (l *BatchSubmitter) publishStateToL1(ctx context.Context, queue *txmgr.Queue[txRef], receiptsCh chan txmgr.TxReceipt[txRef], daGroup *errgroup.Group) {
	for {
		select {
		case <-ctx.Done():
			return
		default:
		}
		// if the txmgr is closed, we stop the transaction sending
		if l.Txmgr.IsClosed() {
			l.Log.Info("Txmgr is closed, aborting state publishing")
			return
		}
		if !l.checkTxpool(queue, receiptsCh) {
			l.Log.Info("txpool state is not good, aborting state publishing")
			return
		}

		err := l.publishTxToL1(ctx, queue, receiptsCh, daGroup)
		if err != nil {
			if err != io.EOF {
				l.Log.Error("Error publishing tx to l1", "err", err)
			}
			return
		}
	}
}
```

Here’s what it does:

1. Builds transactions based on the current L2 block state
2. If necessary, stores them first in AltDA (Data Availability Layer)
3. Prepares a candidate transaction to be submitted to L1
4. Queues it using TxMgr for eventual submission to L1



## Final Thoughts

Optimism's batch architecture is impressively robust. Despite being "optimistic," it's built with a ton of fail-safes, retries, and validation layers. As someone who prefers to understand how things tick before using them in production, this deep dive gave me a lot of confidence in the system.


