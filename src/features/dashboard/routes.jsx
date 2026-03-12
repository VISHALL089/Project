import React, { lazy } from 'react';

const DashboardPage = lazy(() => import('./DashboardPage'));

export const dashboardRoutes = [
  {
    path: '/',
    element: <DashboardPage />,
  }
];
