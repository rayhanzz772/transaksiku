import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

import { Card, Heading } from "../atoms/index"; // Pastikan path sesuai
import { formatCurrency } from "../utils/format";

const COLORS = ['#0ea5e9', '#facc15', '#ef4444'];

const DashboardCharts = ({ data, isDarkMode }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {/* Line Chart */}
    <Card className={isDarkMode ? "bg-gray-700" : "bg-white"}>
      <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Grafik Transaksi 7 Hari Terakhir</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.transactions7Days}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
          <XAxis dataKey="date" className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
          <YAxis tickFormatter={formatCurrency} className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
          <Tooltip
            contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', color: isDarkMode ? '#f9fafb' : '#111827' }}
            labelStyle={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
            formatter={formatCurrency}
          />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke={isDarkMode ? "#ffffff" : "#0e0e0e"} name="Jumlah Transaksi" />
        </LineChart>
      </ResponsiveContainer>
    </Card>

    {/* Bar Chart */}
    <Card className={isDarkMode ? "bg-gray-700" : "bg-white"}>
      <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Top 5 Rekening Tujuan</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.topAccounts}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
          <XAxis dataKey="name" className="text-xs" angle={-15} textAnchor="end" height={50} tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
          <YAxis tickFormatter={formatCurrency} className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
          <Tooltip
  contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', color: isDarkMode ? '#f9fafb' : '#111827' }}
  labelStyle={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
  formatter={formatCurrency}
/>
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" name="Jumlah Transaksi" />
        </BarChart>
      </ResponsiveContainer>
    </Card>

    {/* Pie Chart */}
    <Card className={`lg:col-span-2 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
      <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Kategori Transaksi</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.categorySummary}
            cx="50%" cy="50%"
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
    </Card>

    {/* Area Chart */}
    <Card className={isDarkMode ? "bg-gray-700" : "bg-white"}>
      <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Saldo dari Waktu ke Waktu</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data.balanceOverTime}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
          <XAxis dataKey="date" className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
          <YAxis tickFormatter={formatCurrency} className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
          <Tooltip
  contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', color: isDarkMode ? '#f9fafb' : '#111827' }}
  labelStyle={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
  formatter={formatCurrency}
/>
          <Area type="monotone" dataKey="balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBalance)" name="Saldo" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>

    {/* Radar Chart */}
    <Card className={isDarkMode ? "bg-gray-700" : "bg-white"}>
      <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Perbandingan Bulanan</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data.monthlyComparison} outerRadius={90}>
          <PolarGrid />
          <PolarAngleAxis dataKey="month" />
          <PolarRadiusAxis />
          <Radar name="2024" dataKey="year2024" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
          <Radar name="2025" dataKey="year2025" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
          <Tooltip
  contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', color: isDarkMode ? '#f9fafb' : '#111827' }}
  labelStyle={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
  formatter={formatCurrency}
/>
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Card>

  </div>
);

export default DashboardCharts;
