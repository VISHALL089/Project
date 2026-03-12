import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation';

const Sidebar = () => {
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
          <div style={avatarStyle}>VS</div>
          <div style={userInfoStyle}>
            <p style={userNameStyle}>Vishal L.</p>
            <p style={userRoleStyle}>Alpha Tester</p>
          </div>
        </div>
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
const userBadgeStyle = { display: 'flex', alignItems: 'center', background: '#1e293b', padding: '12px', borderRadius: '12px' };
const avatarStyle = { width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' };
const userInfoStyle = { marginLeft: '12px' };
const userNameStyle = { fontSize: '0.85rem', fontWeight: '600', margin: 0 };
const userRoleStyle = { fontSize: '0.7rem', color: '#64748b', margin: 0 };

export default Sidebar;
