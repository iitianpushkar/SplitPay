import React, { useState, useEffect } from "react";
import AssetSelection from "./components/AssetSelection";
import { ethers } from "ethers";
import StakingCalculator from "./components/StakingCalculator";
import StakingProgress from "./components/StakingProgress";
import { useAppStore } from "@/store/store";

const StakingPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [apy, setApy] = useState<number>(0);
  const { connectToStakeContract, stakeContractInstance } = useAppStore();

  useEffect(() => {
    connectToStakeContract(); // Connects to the contract on component mount
  }, []);

  return (
    <div className="max-h-screen  text-white p-6">
      <h1 className="text-3xl font-bold text-center">🚀 Stake Your Assets, Earn  Yield</h1>
      <p className="text-center text-gray-400">Choose from 30+ assets and start earning today.</p>

      {/* Asset Selection */}
      <AssetSelection onSelectAsset={setSelectedAsset} setApy={setApy}/>
      <div className="flex justify-center">
      {/* Staking Calculator */}
      {selectedAsset && (
        <StakingCalculator
        asset={selectedAsset}
        amount={stakingAmount}
        setAmount={setStakingAmount}
        apy={apy}
        onStake={async () => {
          try {
            if (!stakingAmount || isNaN(stakingAmount) || stakingAmount <= 0) {
              console.error("Invalid staking amount!");
              return;
            }
      
            console.log("Contract Instance", stakeContractInstance);
            console.log("Staking Amount", stakingAmount);
      
            const amountInWei = ethers.utils.parseUnits(stakingAmount.toString(), "ether");
      
            const tx = await stakeContractInstance?.stake(amountInWei, {
              value: amountInWei, // Send ETH
            });
      
            console.log("Transaction sent:", tx.hash);
            setIsStaking(true);
      
            await tx.wait(); // Wait for confirmation
            console.log("Transaction confirmed ✅");
          } catch (error) {
            console.error("Staking Error:", error);
          }
        }}
      />
      
      
      )}
      </div>

      {/* Staking Progress */}
      {isStaking && <StakingProgress asset={selectedAsset!} amount={stakingAmount}  />}

    </div>
  );
};

export default StakingPage;
