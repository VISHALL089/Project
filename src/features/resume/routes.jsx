import React, { lazy } from 'react';

const ResumeLayout = lazy(() => import('./ResumeLayout'));

export const resumeRoutes = [
  {
    path: '/resume/*',
    element: <ResumeLayout />,
  }
];
