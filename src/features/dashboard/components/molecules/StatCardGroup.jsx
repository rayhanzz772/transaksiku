import CardStat from "../atoms/CardStat";
import React from "react";
import { formatCurrency } from "../utils/format";

const StatCardGroup = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <CardStat title="Total Saldo" value={formatCurrency(data.totalBalance)} bgColor="bg-blue-500" />
    <CardStat title="Jumlah Transaksi Hari Ini" value={data.todayTransactionCount} bgColor="bg-green-500" />
    <CardStat title="Transaksi Terbanyak" value={data.mostType} bgColor="bg-purple-500" />
  </div>
);

export default StatCardGroup;
