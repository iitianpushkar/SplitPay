import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCalendarAlt, FaCreditCard, FaCode } from "react-icons/fa";

const tools = [
  {
    icon: <FaShoppingCart size={24} />,
    title: "Buy Now, Pay Never",
    description: "Use your staked yield to pay for purchases over time.",
    button: "Start Shopping",
  },
  {
    icon: <FaCalendarAlt size={24} />,
    title: "Manage Subscriptions",
    description: "Auto-pay services like Netflix, Spotify using yield.",
    button: "View Subscriptions",
  },
  {
    icon: <FaCreditCard size={24} />,
    title: "One-Time Payments",
    description: "Pay merchants directly using staked yield.",
    button: "Make Payment",
  },
  {
    icon: <FaCode size={24} />,
    title: "SplitPay API",
    description: "Merchants can integrate SplitPay to accept crypto payments.",
    button: "Learn More",
  },
];

const PaymentTools: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool, index) => (
        <motion.div 
          key={index}
          className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-blue-400">{tool.icon}</div>
          <h3 className="text-lg font-bold mt-2">{tool.title}</h3>
          <p className="text-gray-400 mt-1">{tool.description}</p>
          <button className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
            {tool.button}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default PaymentTools;
