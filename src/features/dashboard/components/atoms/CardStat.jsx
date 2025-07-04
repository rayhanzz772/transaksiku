import React from "react";

const CardStat = ({ title, value, bgColor = "bg-blue-500" }) => (
  <div className={`${bgColor} text-white p-6 rounded-lg shadow-md flex flex-col items-center text-center`}>
    <p className="text-sm font-medium opacity-90">{title}</p>
    <p className="text-3xl font-extrabold mt-2">{value}</p>
  </div>
);
export default CardStat;
