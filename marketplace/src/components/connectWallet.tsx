// src/components/WalletConnector.tsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {Button} from "@/components/ui/button"

// Replace these with your contract's details.
const CONTRACT_ADDRESS = "0x4f66060e4623f9a54cF56618e4059216420Bd666";
const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			}
		],
		"name": "PaymentProcessed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "ProductListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			}
		],
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					}
				],
				"internalType": "struct Marketplace.Product[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "listProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

// Extend the global Window interface to include ethereum.
declare global {
  interface Window {
    ethereum?: any;
  }
}

const TESTNET_CHAIN_ID = "0xaa36a7"; // Sepolia Testnet chain ID (in hex)

interface WalletConnectorProps {
  onAccountChange?: (account: string | null) => void;
  onContractChange?: (contract: ethers.Contract | null) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  onAccountChange,
  onContractChange,
}) => {
  // State variables with proper types.
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // Function to switch to the Sepolia Testnet.
  const switchToTestnet = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        const currentChainId: string = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (currentChainId !== TESTNET_CHAIN_ID) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: TESTNET_CHAIN_ID }],
          });
        }
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: TESTNET_CHAIN_ID,
                  chainName: "Sepolia Testnet",
                  rpcUrls: ["https://sepolia.infura.io/v3/your-infura-project-id"],
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                  nativeCurrency: {
                    name: "SepoliaETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add network:", addError);
          }
        } else {
          console.error("Error switching network:", switchError);
        }
      }
    }
  };

  // Function to connect the wallet.
  const connectWallet = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        await switchToTestnet();
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        console.log("provider",ethersProvider)
        setProvider(ethersProvider);

        // Request account access.
        const accounts: string[] = await ethersProvider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        // Notify parent.
        onAccountChange && onAccountChange(accounts[0]);

        // Get the signer.
        const ethersSigner = await ethersProvider.getSigner();
        console.log("signer",ethersSigner)
        setSigner(ethersSigner);

        // Create a contract instance.
        const ethersContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, ethersSigner);
        setContract(ethersContract);
        // Notify parent.
        onContractChange && onContractChange(ethersContract);

        console.log("Connected account:", accounts[0], ethersContract);
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this dApp.");
    }
  };

  // Listen for account and chain changes.
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        const newAccount = accounts[0] || null;
        setAccount(newAccount);
        onAccountChange && onAccountChange(newAccount);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [onAccountChange]);

  // Function to disconnect the wallet.
  const disconnectWallet = (): void => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
    onAccountChange && onAccountChange(null);
    onContractChange && onContractChange(null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          <Button className="bg-gray-950 text-white hover:bg-gray-950" onClick={disconnectWallet}>Disconnect Wallet</Button>
        </div>
      ) : (
        <Button className="bg-gray-950 text-white hover:bg-gray-950" onClick={connectWallet}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default WalletConnector;
