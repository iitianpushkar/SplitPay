import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GiMiner } from "react-icons/gi";

const tokens: string[] = [
  "BTC",
  "ETH",
  "MATIC",
  "SOL",
  "USDC",
  "APT",
  "DOT",
  "AVAX",
  "ADA",
]; // Tokens to cycle through

interface HeroSectionProps {
  setStartStakingClicked: React.Dispatch<React.SetStateAction<boolean>>;
  startStakingClicked: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  setStartStakingClicked,
  startStakingClicked,
}) => {
  const [currentToken, setCurrentToken] = useState<string>(tokens[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToken((prev) => {
        const currentIndex = tokens.indexOf(prev);
        return tokens[(currentIndex + 1) % tokens.length]; // Cycle through tokens
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[50%] flex flex-col justify-end items-center bg-black text-center z-50">
      <motion.h1
  className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
             drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] tracking-wide uppercase z-50 pb-20"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <GiMiner className="inline-block text-cyan-400 animate-bounce" size={50} /> {/* Animated Icon */}
  Split <span className="text-white">Finance</span>
</motion.h1>

      {/* Main Heading */}
      <motion.h1
        className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Stake Any Asset, Earn AI-Optimized Yield
      </motion.h1>

      {/* Dynamic Token Roll-Up Animation */}
      <motion.p
        className="mt-4 text-lg text-gray-300 z-50 font-semibold flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        You can stake{" "}
        <span className="overflow-hidden h-6 w-16 relative mx-1 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentToken}
              className="absolute left-0 right-0 text-blue-400 font-semibold"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {currentToken}
            </motion.span>
          </AnimatePresence>
        </span>
        & 100+ tokens supported.
      </motion.p>

      {/* Subtext */}
      <motion.p
        className="text-md text-gray-500 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        No lock-ins, no complexity.
      </motion.p>

      {/* Start Staking Button */}

      {startStakingClicked ? (
        <motion.button
          className="mt-6 px-8 py-3 rounded-full text-white text-lg font-semibold w-[200px] 
  bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/dashboard")}
        >
          <span className="absolute inset-0 bg-blue-500 blur-lg opacity-40 animate-pulse"></span>
          <span className="relative z-10">Continue</span>
        </motion.button>
      ) : (
        <motion.button
          className="mt-6 px-8 py-3 rounded-full text-white text-lg font-semibold w-[200px] 
  bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setStartStakingClicked((prev) => !prev)}
        >
          <span className="absolute inset-0 bg-blue-500 blur-lg opacity-40 animate-pulse"></span>
          <span className="relative z-10">Start Staking</span>
        </motion.button>
      )}
    </div>
  );
};

export default HeroSection;
