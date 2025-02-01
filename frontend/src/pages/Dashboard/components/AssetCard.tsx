import React from "react";
import { motion } from "framer-motion";

interface AssetCardProps {
  asset: string;
  balance: number;
  value: number;
  yieldEarned: number;
  apy: number;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, balance, value, yieldEarned, apy }) => {
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-md"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-xl font-bold">{asset}</h3>
      <p className="text-gray-400">Staked: {balance} {asset} (${value})</p>
      <p className="text-green-400">Yield Earned: {yieldEarned} {asset}</p>
      <p className="text-yellow-300">Live APY: {apy}%</p>
    </motion.div>
  );
};

export default AssetCard;
