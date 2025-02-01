import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const assets = [
  { name: "ETH", apy: "8.5%" },
  { name: "MATIC", apy: "9.2%" },
  { name: "BTC", apy: "6.8%" },
  { name: "SOL", apy: "7.4%" },
  { name: "USDC", apy: "5.0%" },
];

interface AssetSelectionProps {
  onSelectAsset: (asset: string) => void;
}

const AssetSelection: React.FC<AssetSelectionProps> = ({ onSelectAsset }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="mt-6">
      <div className="flex items-center bg-gray-800 rounded-lg p-3">
        <FaSearch className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search for an asset..."
          className="bg-transparent outline-none text-white ml-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {assets
          .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
          .map((asset) => (
            <motion.div
              key={asset.name}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelectAsset(asset.name)}
            >
              <h3 className="text-lg font-bold">{asset.name}</h3>
              <p className="text-green-400">APY: {asset.apy}</p>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AssetSelection;
