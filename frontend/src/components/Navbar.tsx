import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaWallet } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlinePayments,
} from "react-icons/md";
import { GiMiner } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAppStore } from "@/store/store";

const Navbar: React.FC = () => {
  const { userWalletAddress } = useAppStore();
  const [walletAddress, setWalletAddress] = useState<string | null>(
    userWalletAddress ?? null
  );
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    toast.success("Wallet disconnected!");
  };

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 shadow-md flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold">
        <GiMiner className="text-blue-400" size={26} />
        <span>Split Finance</span>
      </NavLink>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-lg">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold flex items-center"
                : "hover:text-blue-400 flex items-center"
            }
          >
            <MdDashboard size={20} className="mr-1" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staking"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold flex items-center"
                : "hover:text-blue-400 flex items-center"
            }
          >
            <GiMiner size={20} className="mr-1" /> Staking
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/splitpay"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-bold flex items-center"
                : "hover:text-blue-400 flex items-center"
            }
          >
            <MdOutlinePayments size={20} className="mr-1" /> SplitPay
          </NavLink>
        </li>
      </ul>

      {/* Right Side: Wallet & AI Button */}
      <div className="flex items-center space-x-4">
        {/* AI Chatbot Button */}
        

        {/* Wallet Section */}
        {walletAddress ? (
          <div className="relative">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center shadow-md"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <FaWallet size={20} className="mr-2" />
              {walletAddress}
            </button>

            {/* Wallet Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-md">
                <CopyToClipboard
                  text={walletAddress}
                  onCopy={() => toast.success("Address Copied!")}
                >
                  <button className="w-full  py-2 hover:bg-gray-700">
                    📋 Copy Address
                  </button>
                </CopyToClipboard>
                <a
                  href={`https://etherscan.io/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 hover:bg-gray-700"
                >
                  🔍 View on Explorer
                </a>
                <button
                  onClick={handleDisconnect}
                  className="w-full px-4 py-2 hover:bg-red-600 text-red-300 flex items-center"
                >
                  <IoMdLogOut className="mr-2" /> Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full shadow-md"
            onClick={() => toast.success("Connecting...")}
          >
            Connect Wallet
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
