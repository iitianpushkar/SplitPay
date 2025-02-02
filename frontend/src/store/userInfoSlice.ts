import { ethers } from "ethers";
import { StateCreator } from "zustand";

export interface UserState {
  userWalletAddress?: string;
  setUserWalletAddress: (userWalletAddress: string) => void;
  stakeContractInstance?: ethers.Contract | null;
  connectToStakeContract: () => Promise<void>;
  stakeInfo: { asset: string; amount: number; yield: number; duration: number }[]; 
  setStakeInfo: (stakeInfo: { asset: string; amount: number; yield: number; duration: number }[]) => void;
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
  userWalletAddress: undefined,
  stakeContractInstance: null,
  totalValue : 0,
  setTotalValue: (totalValue) => set({ totalValue }),
  stakeInfo: [],
  setStakeInfo: (stakeInfo) => set({ stakeInfo }),
  setUserWalletAddress: (userWalletAddress) => set({ userWalletAddress }),

  connectToStakeContract: async () => {
    if (!window.ethereum) {
      console.error("MetaMask not detected!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      await provider.send("eth_requestAccounts", []); // Request access to accounts
      const signer = provider.getSigner();

      const stakeContractAddress = "0xb7F3A2124DDE9b7Bc7eFfE7DC48bABC78c131976";
      const stakeContractABI = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Staked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Withdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "YieldClaimed",
          type: "event",
        },
        {
          inputs: [],
          name: "YIELD_INTERVAL",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "YIELD_RATE",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "user", type: "address" }],
          name: "calculateYield",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "claimYield",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "user", type: "address" }],
          name: "getAvailableYield",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "stake",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "userInfo",
          outputs: [
            { internalType: "uint256", name: "stakedAmount", type: "uint256" },
            { internalType: "uint256", name: "lastClaimTime", type: "uint256" },
            {
              internalType: "uint256",
              name: "accumulatedYield",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawStake",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ];

      const stakeContractInstance = new ethers.Contract(
        stakeContractAddress,
        stakeContractABI,
        signer
      );

      set({ stakeContractInstance });
      console.log("Connected to Stake Contract", stakeContractInstance);
    } catch (error) {
      console.error("Error connecting to contract:", error);
    }
  },
});
