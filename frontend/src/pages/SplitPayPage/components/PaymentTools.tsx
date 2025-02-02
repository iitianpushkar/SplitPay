import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaCalendarAlt, FaCreditCard, FaCode } from "react-icons/fa";
import { useAppStore } from "@/store/store";
const tools = [
  {
    icon: <FaShoppingCart size={28} />,
    title: "Buy Now, Pay Never",
    description: "Use your staked yield to pay for purchases over time.",
    button: "Start Shopping",
  },
  {
    icon: <FaCalendarAlt size={28} />,
    title: "Manage Subscriptions",
    description: "Auto-pay services like Netflix, Spotify using yield.",
    button: "View Subscriptions",
  },
  {
    icon: <FaCreditCard size={28} />,
    title: "One-Time Payments",
    description: "Pay merchants directly using staked yield.",
    button: "Make Payment",
  },
  {
    icon: <FaCode size={28} />,
    title: "SplitPay API",
    description: "Merchants can integrate SplitPay to accept crypto payments.",
    button: "Learn More",
  },
];

const PaymentTools: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const {totalValue,setTotalValue} = useAppStore();

  // Handle button click (shows modal for "Start Shopping", alerts for others)
  const handleButtonClick = (buttonLabel: string) => {
    if (buttonLabel === "Start Shopping") {
      setSelectedTool(buttonLabel);
      setShowModal(true);
    } else {
      alert(`Action for "${buttonLabel}" is not implemented yet.`);
    }
  };

  // Handle modal selection (redirect or close modal)
  const handleModalOptionClick = (option: string) => {
    if (option === "Our Marketplace") {
      window.open("http://localhost:5174", "_blank");
    } else {
      alert(`Action for "${option}" is not implemented yet.`);
    }
    setShowModal(false);
    const newPrice = totalValue - 0.31;
    setTotalValue(newPrice);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-blue-400">{tool.icon}</div>
            <h3 className="text-lg font-bold mt-2 text-white">{tool.title}</h3>
            <p className="text-gray-400 mt-1">{tool.description}</p>
            <motion.button
              className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(tool.button)}
            >
              {tool.button}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Animated Modal for Payment Options */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-400">
                Choose an Option
              </h2>
              <ul className="space-y-2">
                {["Amazon", "Flipkart", "Myntra", "Our Marketplace"].map(
                  (option) => (
                    <motion.li
                      key={option}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        className={`w-full py-2 rounded transition ${
                          option === "Our Marketplace"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => handleModalOptionClick(option)}
                      >
                        {option}
                      </button>
                    </motion.li>
                  )
                )}
              </ul>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 text-sm text-red-500 hover:underline"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentTools;
