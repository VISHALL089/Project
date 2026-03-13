import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/resume.css';

const ResumeHome = () => (
  <div style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'white' }}>
    <h1 className="serif-heading" style={{ fontSize: '72px', marginBottom: '24px' }}>Build a Resume That<br />Gets Read.</h1>
    <p style={{ color: '#64748b', marginBottom: '40px', maxWidth: '600px', fontSize: '1.2rem' }}>
      Craft high-precision user interfaces and premium digital experiences with our AI-powered resume engine.
    </p>
    <Link to="/resume/builder"><button className="btn-primary" style={{ padding: '20px 48px' }}>START BUILDING</button></Link>
  </div>
);

export default ResumeHome;
