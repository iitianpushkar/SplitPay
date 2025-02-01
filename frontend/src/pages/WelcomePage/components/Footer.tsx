import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 w-screen bg-gray-800 text-center p-6">
      <motion.p
        className="text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Join the community 🚀
      </motion.p>
      <div className="flex justify-center space-x-6 mt-3">
        <motion.a
          href="https://github.com/splitfinance"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
          whileHover={{ scale: 1.2 }}
        >
          GitHub
        </motion.a>
        <motion.a
          href="https://twitter.com/splitfinance"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
          whileHover={{ scale: 1.2 }}
        >
          Twitter
        </motion.a>
        <motion.a
          href="https://discord.gg/splitfinance"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
          whileHover={{ scale: 1.2 }}
        >
          Discord
        </motion.a>

      </div>
    </footer>
  );
};

export default Footer;
