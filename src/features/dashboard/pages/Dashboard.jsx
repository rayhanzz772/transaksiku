import React from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import StatCardGroup from "../components/molecules/StatCardGroup";
import DashboardCharts from "../components/organisms/DashboardCharts";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError || !data) return <div className="p-4 text-center text-red-500">Gagal memuat data dashboard.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Overview Statistik Keuangan</h1>
        <StatCardGroup data={data} />
        <DashboardCharts data={data} />
      </div>
    </div>
  );
}
