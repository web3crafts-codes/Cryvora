# 🚀 Cryvora — Next-Gen Web3 Airdrop & MemeCoin Gateway Platform

![Cryvora Web3 App](/public/assets/hero-section-image.png)

Cryvora is a high-performance Web3 Airdrop and MemeCoin Gateway dApp built on BNB Smart Chain (BSC). It features automated on-chain claim distribution, referral tracking, a live transaction leaderboard, and full Web3 wallet integration powered by Wagmi, Viem, and RainbowKit.

---

## ⚡ Features

- 💎 **$CVR Token Smart Contract:** Light, secure ERC-20 token built with OpenZeppelin contracts (fixed 1 Billion total supply, burnable, zero-arg deployer ownership).
- ⚙️ **MemeCoinGateway Smart Contract:** Automated Web3 claim distribution gateway with configurable claim fee (`0.0071 BNB`) and 15% tax wallet mechanism.
- 📱 **Hybrid Responsive Claim UX:** 1-Click Action Button on desktop devices and interactive slide-to-claim track on mobile touch devices.
- 🤝 **50% Refer & Earn Program:** Dynamic 1-click referral link generator (`?ref=0x...`) storing referrer addresses in local cookies and Web3 smart contract calls.
- 📊 **Real-Time Live Leaderboard:** 10-second auto-updating on-chain transaction ticker with Framer Motion animations.
- 🦊 **1-Click "Add Token To Wallet":** EIP-747 `wallet_watchAsset` integration to instantly add $CVR token (`0x918F568c48722cEa3a33534057255126B49D627f`) to MetaMask / Trust Wallet.

---

## 📜 Deployed Smart Contracts (BSC Mainnet / Testnet)

| Contract | Address |
| :--- | :--- |
| **$CVR Token** | `0x918F568c48722cEa3a33534057255126B49D627f` |
| **MemeCoinGateway** | `0xF38362D9101ee7CA72356Beee62af89806C91CCe` |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti
- **Web3 Infrastructure:** Wagmi v2, Viem, RainbowKit, EIP-747 (Wallet Watch Asset)
- **Smart Contracts:** Solidity `^0.8.20`, OpenZeppelin Contracts (ERC20, ERC20Burnable, Ownable)

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone git@github-personal:YOUR_USERNAME/Cryvora.git
   cd Cryvora
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

MIT © [Cryvora Ecosystem](https://cryvora.com)
