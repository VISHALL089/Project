import React, { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  // Mock Data State
  const [stats] = useState([
    {
      id: 1,
      name: 'Resume Completion',
      value: '85%',
      icon: FileText,
      color: '#34d399', // Emerald 400
      bg: '#ecfdf5', // Emerald 50
      trend: '+5% since yesterday',
      description: 'Strengthen your summary to reach 100%'
    },
    {
      id: 2,
      name: 'Jobs Applied',
      value: '12',
      icon: Briefcase,
      color: '#60a5fa', // Blue 400
      bg: '#eff6ff', // Blue 50
      trend: '3 pending reviews',
      description: 'You are in the top 15% of applicants'
    },
    {
      id: 3,
      name: 'Prep Progress',
      value: '64%',
      icon: TrendingUp,
      color: '#fbbf24', // Amber 400
      bg: '#fffbeb', // Amber 50
      trend: 'Next: Mock Interview',
      description: 'Focus on System Design next'
    }
  ]);

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Welcome back, Vishal!</h1>
          <p style={subtitleStyle}>Here's what's happening with your placement journey today.</p>
        </div>
        <button style={ctaStyle}>
          View Analytics <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </button>
      </header>

      <div style={gridStyle}>
        {stats.map((item) => (
          <div key={item.id} style={cardStyle} className="dashboard-card">
            <div style={cardHeaderStyle}>
              <div style={{ ...iconContainerStyle, backgroundColor: item.bg }}>
                <item.icon color={item.color} size={24} />
              </div>
              <span style={trendStyle}>{item.trend}</span>
            </div>
            
            <div style={cardBodyStyle}>
              <h3 style={statValueStyle}>{item.value}</h3>
              <p style={statNameStyle}>{item.name}</p>
              <p style={descriptionStyle}>{item.description}</p>
            </div>

            <div style={cardFooterStyle}>
              <button style={viewMoreStyle}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .dashboard-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .dashboard-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          }
        `}
      </style>
    </div>
  );
};

// --- Modern UI Styles ---
const containerStyle = {
  animation: 'fadeIn 0.5s ease-out',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
  flexWrap: 'wrap',
  gap: '20px'
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#0f172a',
  margin: '0 0 8px 0',
  letterSpacing: '-0.025em',
};

const subtitleStyle = {
  fontSize: '1rem',
  color: '#64748b',
  margin: 0,
};

const ctaStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 24px',
  backgroundColor: '#0f172a',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '24px',
  padding: '30px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  border: '1px solid #f1f5f9',
  display: 'flex',
  flexDirection: 'column',
};

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '24px',
};

const iconContainerStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const trendStyle = {
  fontSize: '0.75rem',
  fontWeight: '600',
  color: '#64748b',
  backgroundColor: '#f1f5f9',
  padding: '4px 12px',
  borderRadius: '20px',
};

const cardBodyStyle = {
  flex: 1,
};

const statValueStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#0f172a',
  margin: '0 0 4px 0',
};

const statNameStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#334155',
  margin: '0 0 12px 0',
};

const descriptionStyle = {
  fontSize: '0.9rem',
  color: '#64748b',
  lineHeight: '1.5',
  margin: 0,
};

const cardFooterStyle = {
  marginTop: '24px',
  paddingTop: '20px',
  borderTop: '1px solid #f1f5f9',
};

const viewMoreStyle = {
  background: 'none',
  border: 'none',
  color: '#3b82f6',
  fontWeight: '600',
  fontSize: '0.9rem',
  cursor: 'pointer',
  padding: 0,
};

export default Dashboard;
