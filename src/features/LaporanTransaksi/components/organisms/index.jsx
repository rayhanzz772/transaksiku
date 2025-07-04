// === organisms/Charts.js ===
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, Heading } from '../atoms/index';

export const TrendChart = ({ data, formatCurrency, isDarkMode }) => (
  <Card className={isDarkMode ? "bg-gray-700" : "bg-white"}>
    <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Tren Transaksi per Hari</Heading>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
        <XAxis dataKey="date" className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}/>
        <YAxis tickFormatter={formatCurrency} className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }}/>
        <Tooltip
          contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', color: isDarkMode ? '#f9fafb' : '#111827' }}
          labelStyle={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
          formatter={formatCurrency}
        />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke={isDarkMode ? "#ffffff" : "#0e0e0e"} activeDot={{ r: 8 }} name="Jumlah Nominal" />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

export const StatusPieChart = ({ data, chartColors, isDarkMode }) => (
  <Card className={isDarkMode ? "bg-gray-700" : "bg-white"}>
    <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Distribusi Status Transaksi</Heading>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
          {data.map((entry, index) => (
            <Cell key={`cell-status-${index}`} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} Transaksi`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Card>
);

export const TopRecipientsBarChart = ({ data, formatCurrency, isDarkMode }) => (
  <Card className={`lg:col-span-2 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
    <Heading className={isDarkMode ? "text-white" : "text-gray-700"}>Top Rekening Penerima (Berdasarkan Nominal)</Heading>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
        <XAxis dataKey="name" className="text-xs" angle={-15} textAnchor="end" height={50} tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
        <YAxis tickFormatter={formatCurrency} className="text-xs" tick={{ fill: isDarkMode ? "#e5e7eb" : "#4b5563" }} />
        <Tooltip
  contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#ffffff', color: isDarkMode ? '#f9fafb' : '#111827' }}
  labelStyle={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}
  formatter={formatCurrency}
/>
        <Legend />
        <Bar dataKey="amount" fill="#82ca9d" name="Total Nominal" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);