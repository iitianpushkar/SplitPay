import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUnlock, FaArrowRight } from "react-icons/fa";
import { useAppStore } from "@/store/store";

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
  { asset: "SOL", amount: 10, duration: 6, apy: 7.5 },
  { asset: "ADA", amount: 100, duration: 12, apy: 8.0 },
  { asset: "DOT", amount: 50, duration: 6, apy: 7.8 },
];

const StakingDashboard: React.FC = () => {
  const [withdrawable, setWithdrawable] = useState<{ [key: string]: boolean }>({});
  const tableRef = useRef<HTMLDivElement>(null); // Ref for scrolling
  const {stakeInfo , stakeContractInstance} = useAppStore();

  useEffect((

  ) => {
    // Simulated backend check (Replace this with an actual API call)
    const checkWithdrawable = async () => {
      const simulatedBackendResponse = {
        ETH: true, // ETH is withdrawable
        MATIC: false, // MATIC is locked
        BTC: true, // BTC is withdrawable
      };
      setWithdrawable(simulatedBackendResponse);
    };

    checkWithdrawable();
  }, []);

  return (
    <motion.div
      className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Active Stakes Section */}
      <div className="mt-1 ">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">Active Stakes</h3>
        <div
          ref={tableRef}
          className="overflow-x-auto max-h-[200px] border border-gray-700 rounded-lg shadow-lg"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 text-gray-300">
                <th className="p-3">Asset</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Your Yield</th>
                <th className="p-3 text-center">Withdraw</th>
              </tr>
            </thead>
            <tbody>
              {stakeInfo.map((stake, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/50 transition">
                  <td className="p-3">{stake.asset}</td>
                  <td className="p-3">{stake.amount}</td>
                  <td className="p-3">{stake.duration} months</td>
                  <td className="p-3">{((stake.yield) / 100).toFixed(2)} {stake.asset}</td>
                  <td className="p-3 text-center">
                    {withdrawable[stake.asset] ? (
                      <button
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                        onClick={async () =>{alert(`Withdrawing ${stake.amount} ${stake.asset}`)
                        const response = await stakeContractInstance?.withdrawStake()
                        console.log(response)
                      }}
                      >
                        Withdraw <FaArrowRight className="inline ml-1" />
                      </button>
                    ) : (
                      <FaLock className="text-gray-400 mx-auto" size={18} />
                    )}
                  </td>
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
