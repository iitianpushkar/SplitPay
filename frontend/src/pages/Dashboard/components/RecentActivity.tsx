import React from "react";

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold">📜 Recent Activity</h2>
      <table className="w-full mt-3 text-left">
        <thead>
          <tr className="text-gray-400">
            <th>Date</th>
            <th>Type</th>
            <th>Asset</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-700">
            <td>2024-02-01</td>
            <td>Stake</td>
            <td>ETH</td>
            <td>2 ETH</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
