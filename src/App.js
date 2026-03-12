import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Import Modular Routes
import { dashboardRoutes } from './features/dashboard/routes';
import { resumeRoutes } from './features/resume/routes';
import { jobsRoutes } from './features/jobs/routes';

// Combine all feature routes
const allFeatureRoutes = [
  ...dashboardRoutes,
  ...resumeRoutes,
  ...jobsRoutes
];

const LoadingFallback = () => (
  <div style={loadingStyle}>
    <div className="spinner">Loading Module...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            {allFeatureRoutes.map((route, index) => (
              <Route 
                key={index} 
                path={route.path} 
                element={route.element} 
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  fontSize: '1.2rem',
  color: '#3b82f6',
  fontWeight: 'bold'
};

export default App;
