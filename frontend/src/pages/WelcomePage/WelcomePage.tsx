import React, { useState, useRef, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import StakingCalculator from "./components/StakingCalculator";
import WalletConnect from "./components/WalletConnect";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import bg from "@/components/background/vecteezy_simple-black-background-animation-with-gently-moving-white_21224133.mp4";



const WelcomePage: React.FC = () => {
  const [startStakingClicked, setStartStakingClicked] = useState<boolean>(false);
  

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow down to 50% speed
    }

  }, []);

  return (
    <motion.div className="bg-black h-screen relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-[0] w-full h-screen object-cover"
        ref={videoRef}
      >
        <source src={bg} type="video/mp4" />
      </video>

      {/* Hero Section */}
      <HeroSection
        setStartStakingClicked={setStartStakingClicked}
        startStakingClicked={startStakingClicked}
      />

     

      {/* Show Staking Calculator & Wallet Connect when clicked */}
      {startStakingClicked ? (
        <motion.div
          className="flex mt-10 items-center justify-center space-x-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WalletConnect />
          <StakingCalculator />
        </motion.div>
      ) : (
        <FeatureCards />
      )}

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default WelcomePage;
