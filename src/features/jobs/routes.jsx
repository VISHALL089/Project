import React, { lazy } from 'react';

const JobsPage = lazy(() => import('./JobsPage'));

export const jobsRoutes = [
  {
    path: '/jobs',
    element: <JobsPage />,
  }
];
