import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useLaporanTransaksi } from '../hooks/useLaporanTransaksi';
import { useUserPreferences } from "../../../context/UserPreferencesContext";

const transactionStatuses = ['All', 'Berhasil', 'Pending', 'Gagal'];
const chartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6384', '#36A2EB'];

const LaporanTransaksi = () => {
  const {
    isLoading,
    isError,
    filters,
    setFilters,
    allRecipients,
    totalTransactionsCount,
    totalNominal,
    averagePerTransaction,
    trendChartData,
    statusDistributionData,
    topRecipientsData,
    formatCurrency,
  } = useLaporanTransaksi();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError) return <div className="text-center p-10 text-red-500">Gagal memuat data.</div>;

 const { isDarkMode } = useUserPreferences();
  return (
    <div className={`min-h-screen p-4 font-inter ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <div className={`container mx-auto p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <h1 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Laporan Transaksi
        </h1>

        {/* Filtering Section */}
        <div className={`p-6 rounded-lg shadow-inner mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Dari Tanggal</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">Sampai Tanggal</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
            />
          </div>
          <div>
            <label htmlFor="minAmount" className="block text-sm font-medium mb-1">Min Nominal</label>
            <input
              type="number"
              id="minAmount"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
              placeholder="Min Nominal"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
            />
          </div>
          <div>
            <label htmlFor="maxAmount" className="block text-sm font-medium mb-1">Max Nominal</label>
            <input
              type="number"
              id="maxAmount"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
              placeholder="Max Nominal"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
            >
              {transactionStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium mb-1">Rekening Tujuan</label>
            <select
              id="recipient"
              name="recipient"
              value={filters.recipient}
              onChange={handleFilterChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
            >
              {allRecipients.map(recipient => (
                <option key={recipient} value={recipient}>{recipient}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium opacity-90">Total Transaksi</p>
            <p className="text-3xl font-extrabold mt-2">{totalTransactionsCount}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium opacity-90">Total Nominal</p>
            <p className="text-3xl font-extrabold mt-2">{formatCurrency(totalNominal)}</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium opacity-90">Rata-rata per Transaksi</p>
            <p className="text-3xl font-extrabold mt-2">{formatCurrency(averagePerTransaction)}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trend Chart */}
          <div className={`${isDarkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-lg shadow-md`}>
            <h2 className={`text-xl font-semibold mb-4 text-center ${isDarkMode ? "text-white" : "text-gray-700"}`}>
              Tren Transaksi per Hari
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={trendChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} name="Jumlah Nominal" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution Pie Chart */}
          <div className={`${isDarkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-lg shadow-md flex flex-col items-center`}>
            <h2 className={`text-xl font-semibold mb-4 text-center ${isDarkMode ? "text-white" : "text-gray-700"}`}>
              Distribusi Status Transaksi
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-status-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} Transaksi`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Recipients Bar Chart */}
          <div className={`lg:col-span-2 ${isDarkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-lg shadow-md`}>
            <h2 className={`text-xl font-semibold mb-4 text-center ${isDarkMode ? "text-white" : "text-gray-700"}`}>
              Top Rekening Penerima (Berdasarkan Nominal)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topRecipientsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#e0e0e0"} />
                <XAxis dataKey="name" className="text-xs" angle={-15} textAnchor="end" height={50} />
                <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="amount" fill="#82ca9d" name="Total Nominal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanTransaksi;
