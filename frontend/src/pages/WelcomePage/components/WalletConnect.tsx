import React, { useState } from "react";
import Web3 from "web3";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import MetaMask from "@/components/icons/metamask-icon.png";
import Wallet from "@/components/icons/WalletConnect-icon.png";
import Coinbase from "@/components/icons/coinbase-v2.svg";
import Phantom from "@/components/icons/phantom.png";
import Ledger from "@/components/icons/ledger.png";
import Argent from "@/components/icons/Argent.png";
import Rainbow from "@/components/icons/rainbow.png";
import Trust from "@/components/icons/Trust.png";
import { useAppStore } from "@/store/store";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnect: React.FC = () => {
  const [wallet, setWallet] = useState<string[] | null>(null);
  const [walletOptionOpen, setWalletOptionOpen] = useState<boolean>(false);
  const [walletButtonText, setWalletButtonText] = useState<string>("Connect To Wallet");
  const {setUserWalletAddress,userWalletAddress} = useAppStore();

  const connectMetaMask = async (): Promise<void> => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      console.log("Wallet", accounts[0]);
      setWallet(accounts);
      setWalletOptionOpen(false); // Close dialog after connection
      setUserWalletAddress(accounts[0]);
      setWalletButtonText("Connected");

    } else {
      alert("MetaMask not detected!");
    }
  };

  

  const handleWalletOption = (walletName: string): void => {
    if (walletName === "MetaMask") {
      connectMetaMask();
    } else {
      alert(`${walletName} integration coming soon!`);
    }
  };

  console.log("Wallet Address",userWalletAddress);

  return (
    <div className="flex flex-col items-center mt-10 space-y-4 pl-5">
      <motion.button
        className="py-3 rounded-full text-white text-md font-semibold w-[200px] 
  bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden shadow-xl"
        whileHover={{ scale: 1.1 }}
        onClick={() => setWalletOptionOpen(true)}
      >
        {walletButtonText}
      </motion.button>

      <Dialog open={walletOptionOpen} onOpenChange={setWalletOptionOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-bold text-center">
              Connect Your Wallet
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Choose a wallet to connect to Split Finance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* MetaMask */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("MetaMask")}
            >
              <img src={MetaMask} className="w-12 h-12" />
              <p className="text-white mt-2">MetaMask</p>
            </motion.div>

            {/* WalletConnect */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("WalletConnect")}
            >
              {/* <Wallet className="w-12 h-12" /> */}
              <img src={Wallet} className="w-12 h-12" />
              <p className="text-white mt-2">WalletConnect</p>
            </motion.div>

            {/* Coinbase Wallet */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("Coinbase Wallet")}
            >
              <img src={Coinbase} className="w-12 h-12" />
              <p className="text-white mt-2">Coinbase</p>
            </motion.div>

            {/* Phantom */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("Phantom")}
            >
              <img src={Phantom} className="w-12 h-12" />
              <p className="text-white mt-2">Phantom</p>
            </motion.div>

            {/* Ledger */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("Ledger")}
            >
              <img src={Ledger} className="w-12 h-12" />
              <p className="text-white mt-2">Ledger</p>
            </motion.div>

            {/* Argent */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("Argent")}
            >
              <img src={Argent} className="w-12 h-12" />
              <p className="text-white mt-2">Argent</p>
            </motion.div>

            {/* Rainbow */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("Rainbow")}
            >
              <img src={Rainbow} className="w-12 h-12" />
              <p className="text-white mt-2">Rainbow</p>
            </motion.div>

            {/* Trust Wallet */}
            <motion.div
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleWalletOption("Trust Wallet")}
            >
              <img src={Trust} className="w-12 h-12" />
              <p className="text-white mt-2">Trust Wallet</p>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      {wallet && <p className="text-green-400">Connected: {wallet[0]}</p>}
    </div>
  );
};

export default WalletConnect;
