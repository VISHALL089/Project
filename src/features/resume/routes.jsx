import React, { lazy } from 'react';

// Lazy load the Resume component
const ResumePage = lazy(() => import('./ResumePage'));

export const resumeRoutes = [
  {
    path: '/resume',
    element: <ResumePage />,
  }
];
