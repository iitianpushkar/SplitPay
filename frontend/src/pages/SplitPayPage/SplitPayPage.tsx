import React, { useState } from "react";
import PaymentOverview from "./components/PaymentOverview";
import PaymentTools from "./components/PaymentTools";
import PaymentHistory from "./components/PaymentHistory";

const SplitPayPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center">💳 SplitPay: Use Your Yield to Pay</h1>
      <p className="text-center text-gray-400">Manage payments seamlessly with your staked assets.</p>

      {/* Payment Overview */}
      <PaymentOverview />

      {/* Payment Tools */}
      <PaymentTools />

      {/* Payment History */}
      <PaymentHistory />
    </div>
  );
};

export default SplitPayPage;
