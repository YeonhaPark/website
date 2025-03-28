---
title:  Why You Might Not See Your ETH in MetaMask After a Successful Withdraw on zkSync
date:   2025-03-28 
description: Don't panic!
---

Working with zkSync (especially on testnets like zkSync Sepolia) can sometimes be confusing when it comes to tracking ETH transfers in your wallet. Recently, I encountered a flow where everything worked correctly from the contract’s perspective—but MetaMask didn’t show the received funds. Here’s the full story:


## 🧩 The Flow

### 1. Deploying a Contract to zkSync Sepolia

I deployed a simple crowdfunding-style smart contract to the **zkSync Sepolia testnet**. The contract accepted ETH through a `fund()` function, and the `owner` could later withdraw all funds using a `withdraw()` function:

```solidity
function withdraw() public onlyOwner {
    (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(success, "Withdraw failed");
}
```

### 2. Funding the Contract
Using MetaMask, I called `fund()` and sent a small amount of ETH (0.003 ETH). The transaction succeeded, and the contract’s balance increased accordingly. Everything looked great.

### 3. Withdrawing the Funds
Next, I called `withdraw()` from the same account that deployed the contract (the owner). The transaction succeeded, and the contract’s balance dropped to 0.

So far, so good—**or so I thought**.

### 4. But… No Incoming ETH in MetaMask? 😕
After the withdrawal, I expected to see a **+0.003 ETH** incoming transaction in MetaMask.
But MetaMask showed:


 <div style="display: flex;justify-content: center;">
<img src="/articles/metamask.png" alt="metamask" width="200"/>
</div>

there was no "received ETH" history at all in MetaMask. It looked like nothing happened.


What happened? Was my contract function written bad? But when I checked the balance, it was gone!


![zkexplorer](/articles/zkexplorer.png)

Oh wait, when I checked the Transfer tab of zksync explorer, it worked!

Yes, if you check a block explorer like **zkSync Explorer**, you'll find the ETH was indeed transferred to your address under the **Transfers** or **Internal Transactions** tab.

So yes—you got the funds. It just wasn't obvious.

## 🧠 The Reason: Internal Transactions
The root cause here is that **MetaMask only shows external transactions by default**.

In this case:
- I made a contract call (to `withdraw()`)
- The contract then used `.call{value: ...}` to send ETH **back to me**
- This transfer is considered an **internal transaction**, because it's triggered *by the contract*, not *directly* from another wallet

> 🔍 MetaMask **does not show internal transactions** in your activity feed.

<br />

## 📦 When MetaMask Actually Shows "+ ETH Received"

To understand why MetaMask didn’t show a "+" for the received ETH, here’s a breakdown of how different transaction types behave:

| Type | Description | MetaMask Shows "+ETH"? |
|------|-------------|------------------------|
| **EOA → EOA** | A wallet directly sends ETH to your wallet | ✅ Yes |
| **EOA → Contract (msg.value)** | You send ETH to a contract | ❌ No (only shows "-ETH") |
| **Contract → EOA** | A contract sends ETH to you (e.g. withdraw) | ❌ No (internal tx only) |
| **Token transfer with event** | ERC20 `Transfer` event fired | ✅ Yes (in Tokens tab) |


<br />

So in our case, because the transfer happened as a result of a smart contract calling `.call{value: ...}` to your address, MetaMask considers this an **internal transaction**, and doesn't display it in the activity list as a new incoming ETH.

Even though your balance increased, it won't say something like **"+0.003 ETH received"** in the UI.

You can always double-check using zkSync Explorer or another block explorer that shows internal transactions.

<br />
<br />

## 🔍 Internal vs. External Transactions

### 🧾 External Transaction

**Definition:** A transaction initiated directly by a user (EOA — externally owned account)

**Key traits:**
- Signed and sent by a human wallet (MetaMask, etc.)
- Uses gas from the sender
- Recorded directly on the blockchain
- Clearly shown in MetaMask (e.g. as + or - ETH)

**Examples:**
- Sending ETH from one wallet to another
- Calling a contract function directly (like `fund()` or `withdraw()`)

### 🌀 Internal Transaction

**Definition:** A transaction that happens as part of a smart contract’s execution

**Key traits:**
- Triggered *within* a contract function
- Not signed by a user
- Not directly visible in the wallet UI
- Only shown in explorers under “Internal Transactions”

**Examples:**
- Contract sending ETH via `.call{value:}`
- Contract calling another contract

### 🔍 Comparison Table

| Attribute | External Transaction | Internal Transaction |
|----------|-----------------------|-----------------------|
| Triggered by | User (EOA) | Smart Contract |
| Needs signature? | ✅ Yes | ❌ No |
| Recorded on blockchain? | ✅ Yes | ❌ No (only in execution trace) |
| Shown in MetaMask? | ✅ Yes | ❌ No |
| Example | Wallet to wallet transfer | Contract to wallet transfer (withdraw) |



## ✅ Conclusion
If you're working with contracts on zkSync (or any L2), and you don't see funds appear in MetaMask after a withdrawal:

- Check the **contract logic**: did it use `.call`, `.transfer`, or `.send`?
- Check your **explorer (zkSync Explorer)** for internal transfers
- **Don’t panic if MetaMask says -0 ETH**—you likely *did* receive the funds!

Happy building! 🚀

