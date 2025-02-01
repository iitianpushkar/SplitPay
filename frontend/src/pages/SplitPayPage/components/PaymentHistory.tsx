import React from "react";

const PaymentHistory: React.FC = () => {
  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">📜 Payment History</h2>
      <table className="w-full mt-3 text-left">
        <thead>
          <tr className="text-gray-400">
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Asset Used</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-700">
            <td>2023-10-01</td>
            <td>Amazon</td>
            <td>$200</td>
            <td>ETH Yield</td>
            <td>✅ Paid</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td>2023-10-05</td>
            <td>Netflix</td>
            <td>$15</td>
            <td>MATIC Yield</td>
            <td>⏳ Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
