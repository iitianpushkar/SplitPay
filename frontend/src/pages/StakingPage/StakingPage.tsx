import React, { useState } from "react";
import AssetSelection from "./components/AssetSelection";
import StakingCalculator from "./components/StakingCalculator";
import StakingProgress from "./components/StakingProgress";
import StakingDashboard from "../Dashboard/components/StakingDashboard";

const StakingPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakingDuration, setStakingDuration] = useState<number>(6); // Default: 6 months
  const [isStaking, setIsStaking] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center">🚀 Stake Your Assets, Earn AI-Optimized Yield</h1>
      <p className="text-center text-gray-400">Choose from 30+ assets and start earning today.</p>

      {/* Asset Selection */}
      <AssetSelection onSelectAsset={setSelectedAsset} />

      {/* Staking Calculator */}
      {selectedAsset && (
        <StakingCalculator
          asset={selectedAsset}
          amount={stakingAmount}
          setAmount={setStakingAmount}
          duration={stakingDuration}
          setDuration={setStakingDuration}
          onStake={() => setIsStaking(true)}
        />
      )}

      {/* Staking Progress */}
      {isStaking && <StakingProgress asset={selectedAsset!} amount={stakingAmount} duration={stakingDuration} />}

    </div>
  );
};

export default StakingPage;
