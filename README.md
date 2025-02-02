# **Split Finance 🚀 – Stake, Earn, & Pay with Yield**  

 
🌍 **Network Support:** Ethereum, Polygon

---

## **📌 Overview**  
**Split Finance** is a cutting-edge **DeFi protocol** that allows users to **stake assets, earn yield, and pay for real-world expenses without selling their holdings**. Using **AI-powered yield optimization and zkp integration on polygon amoy chain**, Split Finance offers a **seamless** staking and payment experience across multiple chains.  

---

## **✨ Key Features**  

### 🔹 **Staking Platform**  
✅ **Multi-Asset Support** – Stake **ETH, MATIC, BTC, SOL, USDC, & 100+ tokens**.  
✅ **AI Yield Optimization** – Get **real-time APY predictions** & auto-allocate funds.
✅ **Secure & Trustless** – Built on **Ethereum & Polygon**, using audited smart contracts and api data are zk proved.  

### 💳 **SplitPay (Payments Using Yield)**  
✅ **Buy Now, Pay Never (BNPL)** – Use **staked yield** to pay and you dont need to wait for you returns.  
✅ **Subscription Management** – Auto-pay services like **Netflix, Spotify, AWS**.  
✅ **Merchant API** – Businesses can accept crypto payments seamlessly.  



---

## **🛠️ Tech Stack**  

#### **🖥️ Frontend**  
✅ **React.js (TypeScript)** – Component-based architecture for UI.  
✅ **Vite** – Fast development server and build tool.  
✅ **Tailwind CSS + tailwindcss-animate** – Responsive styling & animations.  
✅ **Framer Motion** – Smooth animations & UI transitions.  
✅ **Radix UI** – Accessible UI components (`Dialog`, `DropdownMenu`, `Tabs`, etc.).  
✅ **Lucide Icons & React Icons** – Modern SVG-based icons.  
✅ **Chart.js + react-chartjs-2** – Yield analytics & performance graphs.  
✅ **React Router** – Client-side navigation.  
✅ **Zustand** – Global state management.  

#### **🔗 Web3 & Blockchain**  
✅ **Ethers.js** – Ethereum smart contract interaction.  
✅ **Web3.js** – Alternative blockchain interaction library.  
✅ **SnarkJS** – Zero-knowledge proof support for zkEmail & privacy features.  

#### **🤖 AI & Data Handling**  
✅ **Zod** – Schema validation for forms & API responses.  
✅ **React Hook Form + Hookform Resolvers** – Optimized form handling.  
✅ **Axios** – HTTP requests for blockchain & API integration.  

#### **📦 Dev Tools & Build System**  
✅ **ESLint + TypeScript ESLint** – Code linting & best practices.  
✅ **Autoprefixer + PostCSS** – Cross-browser CSS compatibility.  
✅ **Vite** – Fast bundling & optimized builds.  

#### **🔥 Additional Libraries**  
✅ **React Hot Toast** – Real-time notifications (e.g., wallet connection).  
✅ **Embla Carousel** – Auto-playing feature carousel.  
✅ **Copy-to-Clipboard** – Easy address copying for wallets.  

# zk-SNARK Proof for API Data Verification

## Overview
This project demonstrates how to use **zk-SNARKs** with **Circom** and **Groth16** to verify API-fetched data on-chain. We use **zero-knowledge proofs (ZKPs)** to prove that the API response matches an expected value **without revealing** the actual API data on-chain.

## Architecture
1. **Circom Circuit (`YieldProof.circom`)** - Defines the logic for verifying that the API response matches the expected value.
2. **Groth16 Prover** - Generates zk-proofs off-chain.
3. **Solidity Smart Contract (`YieldVerifier.sol`)** - Verifies the proof on-chain.
4. **Foundry Deployment & Interaction** - Deploys the verifier contract and uses `cast call` to verify the zk-proof.

---
## 1️⃣ Circom Circuit (zk-SNARK Setup)

```circom
pragma circom 2.0.0;

template YieldProof() {
    signal input apiYield;      // Yield value fetched from API
    signal input expectedYield; // Expected yield (claimed by user)
    signal output isValid;      // Output: 1 if valid, 0 otherwise

    // Ensure isValid is 1 only if apiYield equals expectedYield
    isValid <== 1 - ((apiYield - expectedYield) * (apiYield - expectedYield));
}

component main = YieldProof();
```

### Steps to Compile and Generate Proof
```sh
circom YieldProof.circom --r1cs --wasm --sym --c
snarkjs groth16 setup YieldProof.r1cs powersOfTau28_hez_final_10.ptau YieldProof_0000.zkey
snarkjs groth16 prove YieldProof_0000.zkey input.json proof.json public.json
```


---


## **🚀 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone git@github.com:iitianpushkar/SplitPay.git
cd SplitPay
```

### **2️⃣ Install Dependencies**  
```sh
cd frontend
npm install
```

### **3️⃣ Run the Development Server**  
```sh
cd backend
npm run dev
```


### **3️⃣ Run the Development Server**  
```sh
cd marketplace
npm run dev
```

### **4️⃣ Smart Contracts are Deploymed on TestNet**  

stakeContractAddress = "0xb7F3A2124DDE9b7Bc7eFfE7DC48bABC78c131976"
marketPlaceContractAddress = "0x4f66060e4623f9a54cF56618e4059216420Bd666"
zkPContract given by Circom after making circuit = "0xbEa09879B6a09214f54358c85386cf613D06bd08"
yielTokenContractAddress = "0x6C05Cd0bEA8D8964c29eCF641609ACF017b484AA"



---

## **📌 Features Breakdown (By Page)**  

### 🏠 **Welcome Page (No Navbar)**  
- **Video Background** with animations.  
- **AI-Powered Introduction to Split Finance**.  
- **"Enter App" Button → Redirects to Dashboard**.  

### 📊 **Dashboard**  
- **Portfolio Overview** – Total assets, yield, AI suggestions.  
- **Asset-Specific Cards** – ETH, MATIC, BTC staking details.  
- **Cross-Chain Swaps** – ETH ↔ MATIC with AI Gas Optimization.  
- **Recent Activity** – Staking, payments, and swap history.  

### ⛓ **Staking Page**  
- **Interactive Staking Calculator** – AI-based APY prediction.  
- **Multi-Asset Staking** – Supports ETH, BTC, MATIC, USDC.  
- **Staking Dashboard** – View **active stakes & yield history**.  
- **Instant Unstaking & Rebalancing** – Auto-allocates assets.  

### 💳 **SplitPay Page (Payments Using Yield)**  
- **BNPL (Buy Now, Pay Never)** – Pay for items in **installments**.  
- **Subscription Management** – Auto-pay services from **staking rewards**.  
- **One-Time Payments** – Direct merchant transactions.  
- **API for Businesses** – Merchants can integrate **crypto payments**.  

---


---

## **🛣️ Roadmap**  

| Milestone | Status |
|-----------|--------|
| ✅ Deploy Staking Contracts | **Completed** |
| ✅ Implement AI Yield Prediction | **Completed** |
| 🟡 SplitPay API for Merchants | **In Progress** |
| 🔜 Mobile App | **Coming Soon** |

---

## **🧑‍💻 Contributing**  
We **welcome contributions** from the community! 🚀  

1. **Fork the repository**  
2. **Create a new branch** (`feature-branch`)  
3. **Commit changes & push** (`git push origin feature-branch`)  
4. **Submit a pull request**  

---

## **📢 Community & Support**  
💬 Join the **Split Finance Discord**: [Coming Soon]  
🐦 Follow us on **Twitter**: [@splitfinance](https://twitter.com/splitfinance)  
📩 Email: **support@splitfinance.com**  

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---
