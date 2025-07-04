import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Dashboard from '../features/dashboard/pages/Dashboard';
import ManajemenRekening from '../features/ManajemenRekening/pages/ManajemenRekening';
import LaporanTransaksi from '../features/LaporanTransaksi/pages/LaporanTransaksi';
import Transfer from '../features/Transfer/pages/Transfer';
import Profile from '../features/Profile/pages/Profile';
import Navbar from '../Navbar';

import ErrorBoundary from '../components/ErrorBoundary';
import RenderRoute from './RenderRoute'; // ✅ Import

const RootLayout = () => (
  <>
    <Navbar />
    <div className="">
      <Outlet />
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <RenderRoute render={() => <Dashboard />} />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'manajemenrekening',
        element: <RenderRoute render={() => <ManajemenRekening />} />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'laporantransaksi',
        element: <RenderRoute render={() => <LaporanTransaksi />} />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'transfer',
        element: <RenderRoute render={() => <Transfer />} />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'profile',
        element: <RenderRoute render={() => <Profile />} />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export default router;
