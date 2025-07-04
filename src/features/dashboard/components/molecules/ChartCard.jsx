import React from "react";
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{title}</h2>
    {children}
  </div>
);

export default ChartCard;
