import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Modular Feature Routes
import { dashboardRoutes } from './features/dashboard/routes';
import { resumeRoutes } from './features/resume/routes';
import { jobsRoutes } from './features/jobs/routes';
import { authRoutes } from './features/auth/routes';

// Combine feature routes that should be protected
const protectedFeatureRoutes = [
  ...dashboardRoutes, // Usually Dashboard is protected
  ...resumeRoutes,
  ...jobsRoutes,
];

// Combine public routes
const publicRoutes = [
  ...authRoutes
];

/**
 * Loading component for code-split (lazy) modules
 */
const PageLoader = () => (
  <div style={loaderContainerStyle}>
    <div style={loaderSpinnerStyle}></div>
    <p style={loaderTextStyle}>Initializing Suite...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route, index) => (
              <Route key={`public-${index}`} path={route.path} element={route.element} />
            ))}

            {/* Private (Protected) Routes wrapped in MainLayout */}
            <Route element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              {protectedFeatureRoutes.map((route, index) => (
                <Route 
                  key={`private-${index}`} 
                  path={route.path} 
                  element={route.element} 
                />
              ))}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
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

export default App;
