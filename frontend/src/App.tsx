import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SplitPayPage from "./pages/SplitPayPage/SplitPayPage";
import StakingPage from "./pages/StakingPage/StakingPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AIChatbot from "./pages/WelcomePage/components/AIChatbot";
import ChatICon from "@/components/icons/icons8-chatbot.gif";
import { motion, AnimatePresence } from "framer-motion";

const questions: string[] = [
  "What is Yield Farming? 🤔",
  "How does AI optimize my staking? 🚀",
  "What are the benefits of SplitPay? 💰",
  "Which assets can I stake? 📊",
  "How does gas fee optimization work? ⛽",
];

const App: React.FC = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>(questions[0]);

  useEffect(() => {
    // Periodically change the chatbot question every 3 seconds
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => {
        const currentIndex = questions.indexOf(prev);
        return questions[(currentIndex + 1) % questions.length];
      });
    }, 5000); // Change question every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <Router>
      <div className="max-h-screen">
      {/* AI Chatbot Toggle */}
      {isChatBotOpen ? (
        <AIChatbot
          isChatBotOpen={isChatBotOpen}
          setIsChatBotOpen={setIsChatBotOpen}
        />
      ) : (
        <>
          {/* Animated Changing Questions Above Chatbot */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuestion}
              className=" absolute bottom-[60px] right-0 z-20 text-white text-sm font-semibold w-[80px] "
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {currentQuestion}
            </motion.p>
          </AnimatePresence>
          <motion.div
            className="absolute bottom-0 right-9 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Chatbot Icon */}
            <img
              src={ChatICon}
              alt="Chatbot"
              className="h-[100px] w-[100px] cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={() => setIsChatBotOpen((prev) => !prev)}
            />
          </motion.div>
        </>
      )}
      <MainApp />
      </div>
    </Router>
  );
};

// This component controls when the Navbar appears
const MainApp: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // Hide Navbar only on Welcome Page

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/splitpay" element={<SplitPayPage />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-white">404 - Page Not Found</h1>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
