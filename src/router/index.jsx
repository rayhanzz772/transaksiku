import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';
import ManajemenRekening from '../features/ManajemenRekening/ManajemenRekening';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/manajemenrekening',
    element: <ManajemenRekening />,
  },
]);

export default router;
