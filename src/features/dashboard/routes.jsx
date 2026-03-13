import React, { lazy } from 'react';

// Lazy load the Dashboard component
const DashboardPage = lazy(() => import('./DashboardPage'));

export const dashboardRoutes = [
  {
    path: '/',
    element: <DashboardPage />,
  }
];
