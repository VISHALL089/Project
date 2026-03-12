import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Mock Page Components
const Dashboard = () => <div><h1>Dashboard</h1><p>Welcome to the Super App.</p></div>;
const ResumeBuilder = () => <div><h1>Resume Builder</h1><p>Module coming soon...</p></div>;
const JobPortal = () => <div><h1>Job Portal</h1><p>Module coming soon...</p></div>;
const PlacementPrep = () => <div><h1>Placement Prep</h1><p>Module coming soon...</p></div>;
const Settings = () => <div><h1>Settings</h1><p>Configuration options.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/jobs" element={<JobPortal />} />
          <Route path="/prep" element={<PlacementPrep />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
