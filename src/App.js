import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Modular Feature Routes
import { dashboardRoutes } from './features/dashboard/routes';
import { resumeRoutes } from './features/resume/routes';
import { jobsRoutes } from './features/jobs/routes';

// Combine all feature routes into a single flat array
const featureRoutes = [
  ...dashboardRoutes,
  ...resumeRoutes,
  ...jobsRoutes,
];

/**
 * Loading component for code-split (lazy) modules
 */
const PageLoader = () => (
  <div style={loaderContainerStyle}>
    <div style={loaderSpinnerStyle}></div>
    <p style={loaderTextStyle}>Loading Module...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {/* Suspense is required for React.lazy components */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* MainLayout acts as a wrapper for all internal pages */}
          <Route element={<MainLayout />}>
            {featureRoutes.map((route, index) => (
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

// --- Inline Styles for Loader ---
const loaderContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f8fafc',
};

const loaderSpinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #e2e8f0',
  borderTop: '4px solid #3b82f6',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const loaderTextStyle = {
  marginTop: '16px',
  fontSize: '1rem',
  color: '#64748b',
  fontWeight: '500',
};

// Add raw CSS for the spinner animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default App;
