import React, { lazy } from 'react';

// Lazy load the Jobs component
const JobsPage = lazy(() => import('./JobsPage'));

export const jobsRoutes = [
  {
    path: '/jobs',
    element: <JobsPage />,
  }
];
