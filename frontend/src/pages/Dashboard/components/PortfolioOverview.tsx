import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const PortfolioOverview: React.FC = () => {
  const chartRef = useRef<ChartJS | null>(null);
  const totalValue = 15240;
  const data = {
    labels: ["ETH", "MATIC", "BTC", "SOL"],
    datasets: [
      {
        data: [87, 3, 5, 15],
        backgroundColor: ["#3B82F6", "#F59E0B", "#F43F5E", "#10B981"],
      },
    ],
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">💰 Total Portfolio Value</h2>
      <p className="text-4xl font-semibold text-blue-400 mt-2">${totalValue}</p>
      <p className="text-sm text-gray-400">
        Across 4 chains: Ethereum, Polygon, Solana, Bitcoin
      </p>
      <div className="w-64 mx-auto mt-4">
        <Pie
          data={data}
          ref={(chart) => {
            if (chart) {
              chartRef.current = chart;
            }
          }}
        />
      </div>
    </motion.div>
  );
};

export default PortfolioOverview;
