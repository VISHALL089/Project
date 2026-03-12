import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Resume Builder',
            description: 'Craft a professional resume with AI assistance.',
            path: '/resume',
            color: '#4e73df'
        },
        {
            title: 'Job Applications',
            description: 'Explore and apply to the latest job openings.',
            path: '/jobs',
            color: '#1cc88a'
        },
        {
            title: 'Placement Preparation',
            description: 'Master your interviews and coding tests.',
            path: '/prep',
            color: '#f6c23e'
        }
    ];

    return (
        <div className="dashboard">
            <header style={headerStyle}>
                <h1>Welcome to V-Placement Suite</h1>
                <p>Your unified platform for career success.</p>
            </header>

            <div className="dashboard-cards" style={cardContainerStyle}>
                {cards.map((card, index) => (
                    <div 
                        key={index} 
                        className="card" 
                        style={{ ...cardStyle, borderTop: `5px solid ${card.color}` }}
                        onClick={() => navigate(card.path)}
                    >
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <button style={{ ...buttonStyle, backgroundColor: card.color }}>Open Module</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const headerStyle = {
    marginBottom: '2.5rem',
    textAlign: 'left'
};

const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem'
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '200px'
};

const buttonStyle = {
    marginTop: '1.5rem',
    padding: '0.6rem 1.2rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-start'
};

export default Dashboard;
