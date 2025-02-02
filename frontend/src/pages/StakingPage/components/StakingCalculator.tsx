import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";

interface StakingCalculatorProps {
  asset: string;
  apy: number;
  amount: number;
  setAmount: (amount: number) => void;
  onStake: () => void;
}

const StakingCalculator: React.FC<StakingCalculatorProps> = ({
  asset, apy, amount, setAmount, onStake
}) => {
  const [estimatedYield, setEstimatedYield] = useState<number>(0);
  const {stakeContractInstance } = useAppStore();


  useEffect(() => {
    setEstimatedYield((amount * apy) / 100);
  }, [amount, apy]);

  return (
    <motion.div 
      className="mt-10 bg-gray-900 p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700 w-[350px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        📈 Stake Your {asset}
      </h3>
      <p className="text-gray-400 text-center mb-4">
        Current APY: <span className="text-blue-400 font-semibold">{apy}%</span>
      </p>

      {/* Amount Input */}
      <div className="relative">
        <input
          type="number"
          placeholder="Enter staking amount"
          className="bg-gray-800 w-full p-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <span className="absolute right-10 top-3 text-gray-400">{asset}</span>
      </div>

      {/* Estimated Yield */}
      <motion.div 
        className="mt-3 text-green-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Estimated Yield: <span className="font-semibold">{estimatedYield} {asset}</span>
      </motion.div>

      {/* Stake Button */}
      <motion.button
        className="mt-5 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                   rounded-lg text-white font-semibold shadow-md relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStake}
      >
        <span className="absolute inset-0 bg-blue-400 blur-xl opacity-30"></span>
        <span className="relative z-10">🚀 Stake Now</span>
      </motion.button>
    </motion.div>
  );
};

export default StakingCalculator;
