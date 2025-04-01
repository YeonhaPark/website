---
title:   Secure Private Key Management in Foundry using ERC-2335 Keystore
date:   2025-04-01 
description: How to Import a Private Key Securely in Foundry
---


When working with smart contracts in Foundry, it's important to avoid exposing private keys directly in your terminal, `.env` files, or code. Fortunately, Foundry supports encrypted keystores based on the [ERC-2335](https://eips.ethereum.org/EIPS/eip-2335) standard, allowing you to safely store and use private keys without compromising security.

---

## ✅ What is ERC-2335?

ERC-2335 defines a JSON-based format for securely storing private keys using password-based encryption. It is:

- 🔐 **Encrypted** using a password (PBKDF2 or scrypt)
- 📁 **Human-readable**, but keys are protected until decrypted
- ✅ **Compatible** with many Ethereum tools and libraries
- 🔄 **Interoperable** and follows standard structure

---

## 🛠 How to Import a Private Key Securely

Run the following command in your Foundry project:

```bash
cast wallet import defaultKey --interactive
```

- Paste your private key when prompted
- Set a strong password
- A new keystore file will be saved to:  
  `.foundry/keystores/defaultKey`

You’ll see output like:

```txt
`defaultKey` keystore was saved successfully.
Address: 0x70997970c51812dc3a010c7d01b50e0d17dc79c
```

---

## 📦 Keystore File Structure (ERC-2335)

```json
{
  "crypto": {
    "cipher": { ... },
    "kdf": { ... },
    "checksum": { ... }
  },
  "description": "Foundry keyfile",
  "pubkey": "0x...",
  "uuid": "xxxx-xxxx-xxxx",
  "version": 4
}
```

> The private key is encrypted and never stored in plaintext.

---

## 🚀 Using the Keystore with Forge Scripts

```bash
forge script script/DeployMyContract.s.sol:DeployMyContract \
  --rpc-url $RPC_URL \
  --account defaultKey \
  --sender 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 \
  --broadcast \
  --unlocked \
  -vvvv
```

- `--account defaultKey` loads the `.foundry/keystores/defaultKey` file
- Foundry will prompt you for the keystore password before signing
- Your private key stays encrypted and never touches the terminal

---

## ⚙️ Full CLI Automation Script Example

You can create a shell script like `deploy.sh` to streamline deployment:

```bash
#!/bin/bash

RPC_URL=https://rpc.yournetwork.io
ACCOUNT_NAME=defaultKey
SCRIPT=script/DeployMyContract.s.sol:DeployMyContract

forge script $SCRIPT \
  --rpc-url $RPC_URL \
  --account $ACCOUNT_NAME \
  --sender 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 \
  --broadcast \
  --unlocked \
  -vvvv
```

> 🔐 This script still won't reveal your private key – only the password prompt will appear when needed.

Make the script executable:

```bash
chmod +x deploy.sh
```

And run it:

```bash
./deploy.sh
```

---

## 👥 Managing Multiple Accounts

You can import multiple accounts:

```bash
cast wallet import deployer --interactive
cast wallet import signer1 --interactive
```

Then specify which to use:

```bash
--account deployer
```

Keystores are saved in:

```bash
.foundry/keystores/
├── defaultKey
├── deployer
└── signer1
```

---

## ❗ Security Tips

| Tip | Reason |
|-----|--------|
| `.gitignore` `.foundry/keystores/` | Prevent accidental Git commits |
| Use strong passwords | Weak passwords can be brute-forced |
| Don't share keystore files | Unless it's a test key, keep it private |
| Never expose private keys | Use keystores instead of plaintext `.env` values |


## 🔚 Summary

By using the ERC-2335 keystore system with Foundry, you can:

- Keep your private keys safe and encrypted
- Avoid risky practices like plaintext `.env` variables
- Cleanly separate accounts for different purposes
- Maintain secure and professional development workflows


Stay safe and secure! 🔐  
Happy building with Foundry 💻✨

