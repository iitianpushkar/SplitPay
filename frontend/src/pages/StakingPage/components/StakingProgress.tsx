import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StakingProgressProps {
  asset: string;
  amount: number;
  duration: number;
}

const StakingProgress: React.FC<StakingProgressProps> = ({ asset, amount, duration }) => {
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    setTimeout(() => setStatus("Success! Staked " + amount + " " + asset), 3000);
  }, [asset, amount]);

  return (
    <motion.div
      className="mt-6 bg-green-900 p-4 rounded-lg text-green-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {status}
    </motion.div>
  );
};

export default StakingProgress;
