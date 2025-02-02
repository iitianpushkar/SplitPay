import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";

interface StakingProgressProps {
  asset: string;
  amount: number;
}

const StakingProgress: React.FC<StakingProgressProps> = ({ asset, amount }) => {
  const [status, setStatus] = useState("Processing...");
  const {setStakeInfo,stakeInfo} = useAppStore();

  useEffect(() => {
    setTimeout(
      () => {setStatus("Success! Staked " + amount + " " + asset);
        const newStakeInfo = {asset:asset, amount:amount,duration:0,yield:0};
        setStakeInfo([...stakeInfo,newStakeInfo]);
        console.log("Stake Info",newStakeInfo);
      },
      3000
    );

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
