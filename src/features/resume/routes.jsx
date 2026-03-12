import React, { lazy } from 'react';

const ResumePage = lazy(() => import('./ResumePage'));

export const resumeRoutes = [
  {
    path: '/resume',
    element: <ResumePage />,
  }
];
