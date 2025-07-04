// === pages/LaporanTransaksi.js ===
import React from 'react';
import { useLaporanTransaksi } from '../hooks/useLaporanTransaksi';
import { useUserPreferences } from "../../../context/UserPreferencesContext";
import { FilterForm } from '../components/molecules/index';
import { TrendChart, StatusPieChart, TopRecipientsBarChart } from '../components/organisms/index';
import { SummaryCard } from '../components/atoms/index';

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
  
  const { isDarkMode } = useUserPreferences();
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError) return <div className="text-center p-10 text-red-500">Gagal memuat data.</div>;

  return (
    <div className={`min-h-screen p-4 font-inter ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <div className={`container mx-auto p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <h1 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Laporan Transaksi
        </h1>

        <FilterForm
          filters={filters}
          handleFilterChange={handleFilterChange}
          allRecipients={allRecipients}
          transactionStatuses={transactionStatuses}
          isDarkMode={isDarkMode}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Total Transaksi" value={totalTransactionsCount} className="bg-blue-500" />
          <SummaryCard title="Total Nominal" value={formatCurrency(totalNominal)} className="bg-green-500" />
          <SummaryCard title="Rata-rata per Transaksi" value={formatCurrency(averagePerTransaction)} className="bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TrendChart data={trendChartData} formatCurrency={formatCurrency} isDarkMode={isDarkMode} />
          <StatusPieChart data={statusDistributionData} chartColors={chartColors} isDarkMode={isDarkMode} />
          <TopRecipientsBarChart data={topRecipientsData} formatCurrency={formatCurrency} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default LaporanTransaksi;