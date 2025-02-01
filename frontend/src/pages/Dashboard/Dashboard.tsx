import React, { useRef, useEffect } from "react";
import PortfolioOverview from "./components/PortfolioOverview";
import AssetCard from "./components/AssetCard";
import StakingDashboard from "./components/StakingDashboard";
import { Line } from "react-chartjs-2";
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
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Feature {
  asset: string;
  balance: number;
  value: number;
  yieldEarned: number;
  apy: number;
}

const features: Feature[] = [
  {
    asset:"ETH", balance:2, value:6000 ,yieldEarned:0.17 ,apy:8.5
  },
  {
    asset:"MATIC", balance:500, value:1000 ,yieldEarned:0.17 ,apy:9.2
  },
  {
    asset:"BTC", balance:0.5, value:30000 ,yieldEarned:0.17 ,apy:6.8
  },
  {
    asset:"SOL", balance:10, value:1000 ,yieldEarned:0.17 ,apy:7.5
  },
  {
    asset:"ADA", balance:100, value:1000 ,yieldEarned:0.17 ,apy:8.0
  },
  {
    asset:"DOT", balance:50, value:1000 ,yieldEarned:0.17 ,apy:7.8
  },
  
];

const Dashboard: React.FC = () => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const yieldHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Yield Earned ($)",
        data: [50, 120, 180, 260, 340, 420],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        fill: true,
        tension: 0.4, // Smooth curved line
        pointRadius: 6, // Bigger points
        pointHoverRadius: 10, // Enlarge points on hover
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1E293B",
        titleColor: "#fff",
        bodyColor: "#9CA3AF",
        borderWidth: 1,
        borderColor: "#3B82F6",
      },
    },
    scales: {
      x: {
        ticks: { color: "white", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      y: {
        ticks: { color: "white", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
  };

  return (
    <div className="h-full text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yield History Chart */}
        <div className="col-span-2 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">📈 Yield History</h2>
          <div className="relative w-full h-[400px]">
            <Line data={yieldHistory} options={chartOptions} ref={(chart) => { if (chart) chartRef.current = chart; }} />
          </div>
        </div>

        {/* Portfolio Overview */}
        <PortfolioOverview />
      </div>

      {/* Asset Cards */}
      <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className=""
            >
              <CarouselContent className="mt-10 h-[150px]">
                {features.map((feature, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/3 md:basis-1/2 lg:basis-1/3"
                  >
                    <AssetCard asset={feature.asset} balance={feature.balance} value={feature.value} yieldEarned={feature.yieldEarned} apy={feature.apy} />
                    
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
     

      <StakingDashboard />
    </div>
  );
};

export default Dashboard;
