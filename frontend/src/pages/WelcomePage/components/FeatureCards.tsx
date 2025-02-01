import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Feature {
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    title: "🌐 Multi-Chain Staking",
    description: "Stake assets across Ethereum, Polygon, Solana, and more!",
    color: "bg-purple-600",
  },
  {
    title: "🤖 AI Yield Optimization",
    description: "AI predicts the best staking strategies for max returns.",
    color: "bg-blue-600",
  },
  {
    title: "⚡ Instant Payouts",
    description: "Use yield directly for payments with zero fees!",
    color: "bg-yellow-600",
  },
  {
    title: "🔄 Auto Compounding",
    description: "Maximize returns with automatic yield reinvestment.",
    color: "bg-teal-600",
  },
  {
    title: "📊 Live APY Predictions",
    description: "Real-time AI forecasts on staking yields.",
    color: "bg-indigo-600",
  },
  {
    title: "🛒 DeFi Subscription Payments",
    description: "Pay for services with staked assets instead of cash.",
    color: "bg-red-600",
  },
];

const FeatureCards: React.FC = () => {
  return (
    <div className="px-10">
      <h2 className="text-center text-3xl font-extrabold text-white mt-20">
        🚀 Key Features
      </h2>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className=""
      >
        <CarouselContent className="mt-10 h-[300px]">
          {features.map((feature, i) => (
            <CarouselItem
              key={i}
              className="basis-1/3 md:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                className={`h-[200px] rounded-xl text-white shadow-lg ${feature.color} text-center flex flex-col justify-center`}
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className=" text-md text-gray-100">{feature.description}</p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeatureCards;
