import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home';
import JobPortalApp from '../modules/job-portal/App';
import ReadinessApp from '../modules/readiness/App';
import ResumeBuilderApp from '../modules/resume-builder/App';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/jobs/*" element={<JobPortalApp />} />
          <Route path="/readiness/*" element={<ReadinessApp />} />
          <Route path="/resume/*" element={<ResumeBuilderApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
