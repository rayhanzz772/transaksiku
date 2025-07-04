import React from "react";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import ChartCard from "../molecules/ChartCard";
import { formatCurrency } from "../utils/format";

const COLORS = ['#0ea5e9', '#facc15', '#ef4444'];

const DashboardCharts = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Line Chart */}
    <ChartCard title="Grafik Transaksi 7 Hari Terakhir">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.transactions7Days}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis tickFormatter={formatCurrency} className="text-xs" />
          <Tooltip formatter={formatCurrency} />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Jumlah Transaksi" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* Bar Chart */}
    <ChartCard title="Top 5 Rekening Tujuan">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.topAccounts}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" className="text-xs" angle={-15} textAnchor="end" height={50} />
          <YAxis tickFormatter={formatCurrency} className="text-xs" />
          <Tooltip formatter={formatCurrency} />
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" name="Jumlah Transaksi" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* Pie Chart */}
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Kategori Transaksi</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.categorySummary}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.categorySummary.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} transaksi`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default DashboardCharts;
