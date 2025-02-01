import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";


interface ActiveStake {
  asset: string;
  amount: number;
  duration: number;
  apy: number;
}

const activeStakes: ActiveStake[] = [
  { asset: "ETH", amount: 10, duration: 6, apy: 8.5 },
  { asset: "MATIC", amount: 500, duration: 12, apy: 9.2 },
  { asset: "BTC", amount: 0.5, duration: 3, apy: 6.8 },
];

// Simulated yield history data


const StakingDashboard: React.FC = () => {
  

  return (
    <motion.div
      className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">📈 Your Staking Dashboard</h2>

      {/* Active Stakes Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-400">Active Stakes</h3>
        <div className="overflow-x-auto">
          <table className="w-full mt-2 text-left">
            <thead>
              <tr className="text-gray-400">
                <th>Asset</th>
                <th>Amount</th>
                <th>Duration</th>
                <th>APY</th>
                <th>Expected Yield</th>
              </tr>
            </thead>
            <tbody>
              {activeStakes.map((stake, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td>{stake.asset}</td>
                  <td>{stake.amount}</td>
                  <td>{stake.duration} months</td>
                  <td>{stake.apy}%</td>
                  <td>{((stake.amount * stake.apy) / 100).toFixed(2)} {stake.asset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
    </motion.div>
  );
};

export default StakingDashboard;