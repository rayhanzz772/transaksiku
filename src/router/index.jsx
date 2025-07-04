// router.js
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Dashboard from '../features/dashboard/pages/Dashboard';
import ManajemenRekening from '../features/ManajemenRekening/pages/ManajemenRekening';
import LaporanTransaksi from '../features/LaporanTransaksi/pages/LaporanTransaksi';
import Transfer from '../features/Transfer/pages/Transfer';
import Profile from '../features/Profile/pages/Profile';
import Navbar from '../Navbar';

import ErrorBoundary from '../components/ErrorBoundary'; // 👉 Import

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />, // ✅ Pasang di Root
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorBoundary />, // ✅ Pasang di Child juga kalau mau
      },
      {
        path: 'manajemenrekening',
        element: <ManajemenRekening />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'laporantransaksi',
        element: <LaporanTransaksi />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'transfer',
        element: <Transfer />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export default router;
