import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import JobPortal from './pages/JobPortal';
import PlacementPrep from './pages/PlacementPrep';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={appContainerStyle}>
        <Sidebar />
        
        <main style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/jobs" element={<JobPortal />} />
            <Route path="/prep" element={<PlacementPrep />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const appContainerStyle = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f8f9fc'
};

const mainContentStyle = {
  flex: 1,
  marginLeft: '240px', // Matches Sidebar width
  padding: '2rem',
  minHeight: '100vh',
  overflowY: 'auto'
};

export default App;
