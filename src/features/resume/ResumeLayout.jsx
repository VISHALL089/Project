import React, { lazy, Suspense } from 'react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './ResumeContext';
import './styles/resume.css';

const ResumeHome = lazy(() => import('./pages/ResumeHome'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const ResumePreviewPage = lazy(() => import('./pages/ResumePreviewPage'));

const ResumeLayout = () => {
  const loc = useLocation();
  const isHome = loc.pathname === '/resume' || loc.pathname === '/resume/';

  return (
    <ResumeProvider>
      <div className="resume-module-container">
        <nav className="topbar no-print" style={{ 
          position: 'sticky', 
          top: 0, 
          borderBottom: '1px solid #e2e8f0', 
          background: 'white', 
          padding: '0 24px', 
          height: '56px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          zIndex: 50
        }}>
          <Link to="/resume" style={{ textDecoration: 'none', fontWeight: 800, fontSize: '18px', color: 'black' }}>AI RESUME ENGINE</Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'ENGINE', path: '/resume' },
              { label: 'BUILDER', path: '/resume/builder' },
              { label: 'PREVIEW', path: '/resume/preview' }
            ].map(item => (
              <Link 
                key={item.label} 
                to={item.path} 
                className={`nav-link ${loc.pathname === item.path ? 'active' : ''}`}
                style={{ 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: loc.pathname === item.path ? '#8B0000' : '#64748b',
                  textDecoration: 'none',
                  borderBottom: loc.pathname === item.path ? '2px solid #8B0000' : 'none',
                  paddingBottom: '4px'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="status-badge" style={{ background: '#8B0000', color: 'white', fontSize: '10px', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>PREMIUM</div>
        </nav>
        
        <div className="resume-content-area">
          <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading Resume Module...</div>}>
            <Routes>
              <Route index element={<ResumeHome />} />
              <Route path="builder" element={<ResumeBuilder />} />
              <Route path="preview" element={<ResumePreviewPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default ResumeLayout;
