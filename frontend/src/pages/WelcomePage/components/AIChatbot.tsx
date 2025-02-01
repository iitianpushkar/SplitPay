import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AIChatbotProps {
  setIsChatBotOpen: (value: boolean) => void;
}

const AIChatbot = ({ setIsChatBotOpen }: AIChatbotProps) => {
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: "Hello! I’m SplitBot 🤖. Ask me about staking yield!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: "user" as "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages([...newMessages, { text: "AI predicts 8.5% APY on ETH staking! 🚀", sender: "bot" as "bot" }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <motion.div
      className="fixed z-10 bottom-4 right-4 bg-gray-900 p-5 rounded-lg shadow-xl w-96 border border-gray-700"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white text-lg font-semibold">Ask SplitBot 🤖</h3>
        <motion.button
          className="text-gray-400 hover:text-red-500"
          whileHover={{ scale: 1.2 }}
          onClick={() => setIsChatBotOpen(false)}
        >
          ✖
        </motion.button>
      </div>

      <div className="max-h-60 overflow-y-auto mt-3 space-y-3 px-1 scrollbar-thin scrollbar-thumb-gray-600">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`p-3 w-fit max-w-[80%] rounded-xl text-sm shadow-md ${
              msg.sender === "bot"
                ? "bg-blue-600 text-white self-start"
                : "bg-gray-700 text-gray-300 self-end"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {msg.text}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="p-3 w-fit max-w-[80%] rounded-xl bg-blue-600 text-white text-sm self-start shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            SplitBot is typing...
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="flex mt-3">
        <input
          className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 text-white border-none focus:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <motion.button
          className="bg-blue-600 px-5 py-2 rounded-r-lg text-white hover:bg-blue-700 shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
        >
          ➤
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AIChatbot;
