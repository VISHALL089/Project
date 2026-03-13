import React, { lazy } from 'react';

const Login = lazy(() => import('./pages/Login'));

export const authRoutes = [
  {
    path: '/login',
    element: <Login />,
  }
];
