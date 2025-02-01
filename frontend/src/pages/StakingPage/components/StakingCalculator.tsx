import React from "react";
import { motion } from "framer-motion";

interface StakingCalculatorProps {
  asset: string;
  amount: number;
  setAmount: (amount: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  onStake: () => void;
}

const StakingCalculator: React.FC<StakingCalculatorProps> = ({
  asset, amount, setAmount, duration, setDuration, onStake
}) => {
  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold">📊 Staking Calculator</h3>
      <p className="text-gray-400">Predict your yield for {asset}.</p>

      <input
        type="number"
        placeholder="Enter staking amount"
        className="bg-gray-700 w-full p-3 rounded-lg text-white mt-3"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <label className="block text-gray-400 mt-3">Staking Duration: {duration} months</label>
      <input
        type="range"
        min={1}
        max={12}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="w-full"
      />

      <motion.button
        className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
        whileHover={{ scale: 1.05 }}
        onClick={onStake}
      >
        Stake Now
      </motion.button>
    </div>
  );
};

export default StakingCalculator;
