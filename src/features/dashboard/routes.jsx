import React, { lazy } from 'react';

// Lazy load the real Dashboard component
const Dashboard = lazy(() => import('./pages/Dashboard'));

export const dashboardRoutes = [
  {
    path: '/',
    element: <Dashboard />,
  }
];
