import React, { useState } from "react";
import { motion } from "framer-motion";

interface PredictedYield {
  apy: string;
  yieldAmount: string;
}

const assets = [
  "ETH", "stETH", "wETH", "rETH", "MATIC", "wMATIC", "BTC", "WBTC", "tBTC",
  "SOL", "mSOL", "jitoSOL", "USDC", "USDT", "DAI", "FRAX", "UST", "OP", "ARB",
  "AVAX", "ATOM", "DOT", "NEAR", "UNI", "AAVE", "COMP", "MKR", "MANA", "SAND",
  "APE", "ZEC", "XMR", "DOGE", "SHIB"
];

const StakingCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [asset, setAsset] = useState<string>("ETH");
  const [predictedYield, setPredictedYield] = useState<PredictedYield | null>(null);

  const calculateYield = (): void => {
    if (!amount) return;
    const apy = Math.random() * (12 - 5) + 5; // Simulated AI APY prediction (5% - 12%)
    const yieldAmount = (parseFloat(amount) * apy) / 100;
    setPredictedYield({ apy: apy.toFixed(2), yieldAmount: yieldAmount.toFixed(2) });
  };

  return (
    <div className="max-w-md mx-auto mt-1 p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">🔮 AI Staking Yield Calculator</h2>

      <div className="space-y-4">
        {/* Asset Selection */}
        <div className="relative">
          <select
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
          >
            {assets.map((token) => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          placeholder="Enter staking amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Predict Button */}
        <motion.button
          className="w-full py-3 mt-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 
                     shadow-lg hover:shadow-blue-400/50 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={calculateYield}
        >
          🚀 Predict Yield
        </motion.button>
      </div>

      {/* Display Predicted Yield */}
      {predictedYield && (
        <motion.div
          className="mt-6 p-4 rounded-xl bg-green-900/30 text-green-300 border border-green-400"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg">📈 Predicted APY: <span className="font-bold">{predictedYield.apy}%</span></p>
          <p className="text-lg">💰 Expected Yield: <span className="font-bold">{predictedYield.yieldAmount} {asset}</span></p>
        </motion.div>
      )}
    </div>
  );
};

export default StakingCalculator;
