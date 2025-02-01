import React, { useRef, useEffect } from "react";
import PortfolioOverview from "./components/PortfolioOverview";
import AssetCard from "./components/AssetCard";
import { Line } from "react-chartjs-2";
import StakingDashboard from "./components/StakingDashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const yieldHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Yield Earned ($)",
        data: [50, 120, 180, 260, 340, 420],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  return (
    <div className="h-[100%] text-white p-6">
      <div className="flex justify-between ">
        {/* Yield History Chart */}
        <div className="mt-8">
          
          <div className="w-full h-[500px] bg-gray-700 p-4 rounded-lg">
            <Line
              data={yieldHistory}
              ref={(chart) => {
                if (chart) {
                  chartRef.current = chart;
                }
              }}
            />
          </div>
        </div>
        {/* Portfolio Overview */}
        <PortfolioOverview />

        {/* Asset Cards */}
        <div className="flex flex-col space-y-4">
          <AssetCard
            asset="ETH"
            balance={2}
            value={6000}
            yieldEarned={0.17}
            apy={8.5}
          />
          <AssetCard
            asset="MATIC"
            balance={500}
            value={800}
            yieldEarned={12}
            apy={6.2}
          />
          <AssetCard
            asset="WBTC"
            balance={0.1}
            value={4000}
            yieldEarned={0.005}
            apy={5.3}
          />
        </div>
      </div>

      <StakingDashboard />
    </div>
  );
};

export default Dashboard;
