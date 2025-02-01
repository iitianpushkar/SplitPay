import React from "react";
import { motion } from "framer-motion";

const PaymentOverview: React.FC = () => {
  return (
    <motion.div 
      className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">💰 Total Available Yield</h2>
      <p className="text-4xl font-semibold text-green-400 mt-2">$1,200</p>
      <p className="text-sm text-gray-400">From staked assets (ETH, MATIC, BTC).</p>

      <h3 className="mt-6 text-lg font-bold text-blue-400">Recent Payments</h3>
      <div className="mt-2 bg-gray-700 p-4 rounded-lg">
        <p>📅 2023-10-01 | Amazon | $200 | ✅ Paid</p>
        <p>📅 2023-10-05 | Netflix | $15 | ⏳ Pending</p>
      </div>
    </motion.div>
  );
};

export default PaymentOverview;
