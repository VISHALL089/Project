import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { NAV_ITEMS } from '../../constants/navigation';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={asideStyle}>
      <div style={logoAreaStyle}>
        <h2 style={logoTextStyle}>V-Placement <span style={subLogoStyle}>Suite</span></h2>
      </div>
      
      <nav style={navStyle}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#3b82f6' : 'transparent',
              color: isActive ? '#ffffff' : '#94a3b8',
            })}
          >
            <item.icon size={20} strokeWidth={2} />
            <span style={{ marginLeft: '12px', fontWeight: '500' }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={footerStyle}>
        <div style={userBadgeStyle}>
          <div style={avatarStyle}>{user?.avatar || 'U'}</div>
          <div style={userInfoStyle}>
            <p style={userNameStyle}>{user?.name || 'User'}</p>
            <p style={userRoleStyle}>{user?.role || 'Member'}</p>
          </div>
        </div>
        
        <button onClick={handleLogout} style={logoutButtonStyle}>
          <LogOut size={18} style={{ marginRight: '10px' }} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

const asideStyle = {
  width: '260px',
  height: '100vh',
  backgroundColor: '#0f172a',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
  boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
  zIndex: 100,
};

const logoAreaStyle = { padding: '24px', borderBottom: '1px solid #1e293b' };
const logoTextStyle = { fontSize: '1.25rem', fontWeight: '700', margin: 0 };
const subLogoStyle = { color: '#3b82f6' };
const navStyle = { flex: 1, padding: '20px 12px' };
const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  margin: '4px 0',
  borderRadius: '8px',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
};
const footerStyle = { padding: '20px', borderTop: '1px solid #1e293b' };
const userBadgeStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  background: '#1e293b', 
  padding: '12px', 
  borderRadius: '12px',
  marginBottom: '16px'
};
const avatarStyle = { width: '36px', height: '36px', borderRadius: '10px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' };
const userInfoStyle = { marginLeft: '12px', overflow: 'hidden' };
const userNameStyle = { fontSize: '0.85rem', fontWeight: '600', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' };
const userRoleStyle = { fontSize: '0.7rem', color: '#64748b', margin: 0 };

const logoutButtonStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  color: '#ef4444',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

export default Sidebar;
