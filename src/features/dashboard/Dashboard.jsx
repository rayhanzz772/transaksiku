import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import { useDashboardData } from './hooks/useDashboardData'; // pastikan path ini benar

const COLORS = ['#0ea5e9', '#facc15', '#ef4444'];

const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="p-4 text-center text-red-500">Gagal memuat data dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Overview Statistik Keuangan</h1>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <p className="text-sm font-medium opacity-90">Total Saldo</p>
            <p className="text-3xl font-extrabold mt-2">{formatCurrency(data.totalBalance)}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <p className="text-sm font-medium opacity-90">Jumlah Transaksi Hari Ini</p>
            <p className="text-3xl font-extrabold mt-2">{data.todayTransactionCount}</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <p className="text-sm font-medium opacity-90">Transaksi Terbanyak</p>
            <p className="text-3xl font-extrabold mt-2 capitalize">{data.mostType}</p>
          </div>
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Grafik Transaksi 7 Hari Terakhir</h2>
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
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Top 5 Rekening Tujuan</h2>
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
          </div>

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
      </div>
    </div>
  );
}
