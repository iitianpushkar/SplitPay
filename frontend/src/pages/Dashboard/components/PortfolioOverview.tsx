import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";
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
import axios from "axios";
import { generateProof } from "@/zkProofs/zkFunction";

// Register Chart.js components
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
import { ethers } from "ethers";
import { error } from "console";

const PortfolioOverview: React.FC = () => {
  const { stakeInfo } = useAppStore();
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [totalValue, setTotalValue] = useState<number>(0);
  const chartRef = useRef<ChartJS | null>(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://min-api.cryptocompare.com/data/price";

  useEffect(() => {
    const fetchPrices = async () => {
      if (stakeInfo.length === 0) return;
      try {
        const symbols = stakeInfo.map((stake) => stake.asset).join(",");
        const response = await axios.get<{ [key: string]: number }>(`${BASE_URL}?fsym=${symbols}&tsyms=${"USD"}&api_key=${API_KEY}`);
        console.log("response", response.data)
        setPrices(response.data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, [stakeInfo]);

  useEffect(() => {
    let totalvalue = 0;
    if (!prices || stakeInfo.length === 0) return;
    console.log("Prices", prices);
  
    const total = stakeInfo.map((stake,index) => {
      console.log("Stake", stake);
      const assetPrice = prices.USD || 0;
      console.log("Asset Price", assetPrice);
      const stakeAmount = parseFloat(stake.amount.toString());
      console.log("Total", sum + assetPrice * stakeAmount);
      totalvalue += price.USD * stake.amount;
      console.log("Total Value", totalvalue);
    
    }, 0);
  
    setTotalValue(totalvalue);
  }, [prices, stakeInfo]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const data = {
    labels: stakeInfo.map((stake) => stake.asset),
    datasets: [
      {
        data: stakeInfo.map((stake) => stake.amount * (prices[stake.asset] || 0)),
        backgroundColor: ["#3B82F6", "#F59E0B", "#F43F5E", "#10B981", "#A855F7", "#EF4444"], // Expandable colors
      },
    ],
  };

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">💰 Total Portfolio Value</h2>
      <p className="text-4xl font-semibold text-blue-400 mt-2">
        ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-sm text-gray-400">
        Across {stakeInfo.length} assets
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
