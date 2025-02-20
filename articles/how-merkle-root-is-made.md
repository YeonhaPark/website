---
title:  How Merkle Root is Made
date:   2024-05-07 
description: What is Merkle Root?
---

**What is Merkle Root?**

A hash that represents the root of the Merkle tree, hashed from transactions consisting of a block.

| Component | Description |
| --- | --- |
| **Block Header** |  |
| Previous Block Hash | A 256-bit hash value that points to the previous block in the chain, effectively linking the blocks together. |
| Merkle Root | A hash value that represents the root of the Merkle tree, which is a data structure that summarizes all the transactions in the block. |
| Timestamp | The approximate time when the block was created/mined. |
| Nonce | A random value used in the mining process to solve the proof-of-work puzzle. |
| Difficulty Target | A value that determines the difficulty of the proof-of-work puzzle for that block. |
| Version | Indicates the version of the block validation rules that should be followed. |
| **Block Body** |  |
| Transaction Counter | A simple count of the number of transactions included in the block. |
| Transactions | A list of valid transactions that are being recorded in the block. Each transaction includes details like the sender's and recipient's addresses, the amount being transferred, and other metadata. |

This table clearly separates the components of the block header and the block body, along with their respective descriptions. The block header contains metadata that links the block to the previous block and secures the integrity of the blockchain, while the block body contains the actual transactions being recorded on the blockchain.


[55,123rd Blockchain Node](https://www.blockchain.com/explorer/blocks/btc/55123)
![](/articles/bc-node-capture1.png)


**Making a Merkle Hash: A Step-by-Step Guide**

In the world of blockchain, Merkle trees play a crucial role in ensuring the integrity and efficient verification of transactions. A Merkle hash, also known as the Merkle root, is the hash value at the root of this tree, which summarizes all the transactions in a block. Let's dive into the process of creating a Merkle hash using an example from the 55,123rd block on the blockchain.

Given:
- Transaction 1 hash: `fb538d4e3d518e6e675e246855374d0b72e1881425627578aaa4719c01cf7489`
- Transaction 2 hash: `29fa3359414a2090d93ec4db049f951a003b0be26426ac806f866e712665a38b`

**Step 1: Convert the hash from big endian to little endian**

In the blockchain, hashes are typically stored in big-endian format. However, for the purpose of creating a Merkle hash, we need to convert them to little-endian format.

```
Transaction 1 hash (small-endian): 8974CF019C71A4AA787562251488E1720B4D375568245E676E8E513D4E8D53FB

Transaction 2 hash (small-endian): 8BA36526716E866F80AC2664E20B3B001A959F04DBC43ED990204A415933FA29
```

**Step 2: Concatenate the hashed digits converted to little endian**

We now concatenate the two small-endian hashes into a single string:

```
8974CF019C71A4AA787562251488E1720B4D375568245E676E8E513D4E8D53FB8BA36526716E866F80AC2664E20B3B001A959F04DBC43ED990204A415933FA29
```

**Step 3: Hash the result using SHA256 twice**

The concatenated string is then hashed using the SHA256 algorithm twice (double SHA256), as per the Bitcoin protocol.

```
SHA256(SHA256(concatenated_string)) = 763ed200a5474a45dc0d196def0f3579d22d8912f1fa0ab3064e627e66fa08a8
```

**Step 4: Convert the hash from Step 3 from little endian to big endian**

Finally, we convert the hash obtained in Step 3 from little-endian to big-endian format to get the final Merkle hash.

```
Merkle hash (big-endian): A808FA667E624E06B30AFAF112892DD279350FEF6D190DDC454A47A500D23E76
```

To visualize the process, here's the binary tree representation of the hash nodes:

```
       A808F
     /      \
  fb538    29fa3   
```

In this way, the Merkle hash acts as a compact summary of all the transactions in a block, allowing efficient verification and ensuring the integrity of the blockchain. Any change in the transactions would result in a different Merkle hash, breaking the chain and making the block invalid.

Let's practice one more time. Now, there are 4 transaction IDs. The steps the same following the binary tree method.


[100,000 Blockchain Node](https://www.blockchain.com/explorer/blocks/btc/100000)
![](/articles/bc-node-capture2.png)


Given:
1) 8c14f0db3df150123e6f3dbbf30f8b955a8249b62ac1d1ff16284aefa3d06d87
2) fff2525b8931402dd09222c50775608f75787bd2b87e56995a7bdd30f79702c4
3) 6359f0868171b1d194cbee1af2f16ea598ae8fad666d9b012c8ed2b79a236ec4
4) e9a66845e05d5abc0ad04ec80f774a7e585c6e8db975962d069a522137b80c1d

**Step 1: Convert the hashes from big endian to little endian**

1) 876da0d3efa4281ff1d1c12ab6498a5a958b0ff3bb3d6f123e1250f13ddb0f148c
2) c40297f730dd7b5a99567eb8d27b78758f60750725c92209d02d401389525bf2ff
3) c46e239ab7d28e2c019bd66daefa8e59a66ef1f21aeebc94d1b17181860ff03965
4) 1d0cb83721529a062d9675b98d6e5c587e4a770fc84ed00abc5a5de04568a6e9

**Step 2: Concatenate the hashed digits converted to little endian**

1) 876da0d3efa4281ff1d1c12ab6498a5a958b0ff3bb3d6f123e1250f13ddb0f148cc40297f730dd7b5a99567eb8d27b78758f60750725c92209d02d401389525bf2ff
2)
c46e239ab7d28e2c019bd66daefa8e59a66ef1f21aeebc94d1b17181860ff039651d0cb83721529a062d9675b98d6e5c587e4a770fc84ed00abc5a5de04568a6e9

**Step 3: Hash the result using SHA256 twice**

1) 15b88c5107195bf09eb9da89b83d95b3d070079a3c5c5d3d17d0dcd873fbdacc
2)
49aef42d78e3e9999c9e6ec9e1dddd6cb880bf3b076a03be1318ca789089308e

**Step 4: Convert the hash from Step 3 from little endian to big endian**

1) (little-endian): 15b88c5107195bf09eb9da89b83d95b3d070079a3c5c5d3d17d0dcd873fbdacc
   (big-endian):
   CCDAFB73D8DCD0173D5D5C3C9A0770D0B3953DB889DAB99EF05B1907518CB815
2)
(little-endian): 49aef42d78e3e9999c9e6ec9e1dddd6cb880bf3b076a03be1318ca789089308e
(big-endian): 8E30899078CA1813BE036A073BBF80B86CDDDDE1C96E9E9C99E9E3782DF4AE49

**Step 5: Repeat the process above**
5-1. Big-endian to small endian
1)
(big-endian):
CCDAFB73D8DCD0173D5D5C3C9A0770D0B3953DB889DAB99EF05B1907518CB815
(little-endian):
15b88c5107195bf09eb9da89b83d95b3d070079a3c5c5d3d17d0dcd873fbdacc
2)
(big-endian): 8E30899078CA1813BE036A073BBF80B86CDDDDE1C96E9E9C99E9E3782DF4AE49
(little-endian):
49aef42d78e3e9999c9e6ec9e1dddd6cb880bf3b076a03be1318ca789089308e

5-2. Concatenate the hashed digits converted to little endian
15b88c5107195bf09eb9da89b83d95b3d070079a3c5c5d3d17d0dcd873fbdacc49aef42d78e3e9999c9e6ec9e1dddd6cb880bf3b076a03be1318ca789089308e

5-3. Hash the result using SHA256 twice
6657a9252aacd5c0b2940996ecff952228c3067cc38d4885efb5a4ac4247e9f3



5-4. Convert the hash from Step 5-3 from little endian to big endian
F3E94742ACA4B5EF85488DC37C06C3282295FFEC960994B2C0D5AC2A25A95766


```
    	  F3E94
    	/      \
	CCDAF     8E308
	/   \     /   \
8c14f fff25 6359f e9a66
```

