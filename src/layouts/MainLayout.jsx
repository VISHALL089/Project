import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const MainLayout = () => {
  return (
    <div style={layoutWrapperStyle}>
      <Sidebar />
      <main style={mainContentStyle}>
        <div style={containerStyle}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// --- Styles ---
const layoutWrapperStyle = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f8fafc', // Slate 50 (light background for contrast)
};

const mainContentStyle = {
  flex: 1,
  marginLeft: '260px', // Exactly width of Sidebar
  transition: 'margin-left 0.3s ease',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 24px',
};

export default MainLayout;
