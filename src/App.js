import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import JobPortal from './pages/JobPortal';
import PlacementPrep from './pages/PlacementPrep';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar" style={navStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}><Link to="/" style={linkStyle}>Dashboard</Link></li>
            <li style={liStyle}><Link to="/resume" style={linkStyle}>Resume Builder</Link></li>
            <li style={liStyle}><Link to="/jobs" style={linkStyle}>Job Portal</Link></li>
            <li style={liStyle}><Link to="/prep" style={linkStyle}>Placement Prep</Link></li>
          </ul>
        </nav>
        
        <main style={mainStyle}>
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

const navStyle = {
  backgroundColor: '#333',
  padding: '1rem',
  marginBottom: '20px'
};

const ulStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'space-around'
};

const liStyle = {
  margin: '0 10px'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const mainStyle = {
  padding: '20px',
  textAlign: 'center'
};

export default App;
