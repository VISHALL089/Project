import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar" style={sidebarStyle}>
            <div className="sidebar-header" style={headerStyle}>
                <h3>V-Placement</h3>
            </div>
            <nav className="sidebar-nav">
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <NavLink 
                            to="/" 
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li style={liStyle}>
                        <NavLink 
                            to="/resume" 
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Resume Builder
                        </NavLink>
                    </li>
                    <li style={liStyle}>
                        <NavLink 
                            to="/jobs" 
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Job Portal
                        </NavLink>
                    </li>
                    <li style={liStyle}>
                        <NavLink 
                            to="/prep" 
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            Placement Prep
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

const sidebarStyle = {
    width: '240px',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    color: 'white',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
};

const headerStyle = {
    padding: '2rem 1.5rem',
    borderBottom: '1px solid #333',
    textAlign: 'center'
};

const ulStyle = {
    listStyleType: 'none',
    padding: '1rem 0',
    margin: 0
};

const liStyle = {
    margin: '0.5rem 0'
};

const linkStyle = {
    display: 'block',
    padding: '0.75rem 1.5rem',
    color: '#ccc',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1rem'
};

const activeLinkStyle = {
    backgroundColor: '#2c2c2c',
    color: '#007bff',
    borderLeft: '4px solid #007bff'
};

export default Sidebar;
