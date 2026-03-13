import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('demo@placement.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={loginCardStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>V</div>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>Log in to access your placement suite</p>
        </div>

        {error && (
          <div style={errorStyle}>
            <AlertCircle size={18} style={{ marginRight: '8px' }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputWrapperStyle}>
              <Mail size={18} style={iconStyle} />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <Lock size={18} style={iconStyle} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              ...buttonStyle,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            {!isSubmitting && <LogIn size={18} style={{ marginLeft: '10px' }} />}
          </button>
        </form>

        <div style={footerStyle}>
          <p>Don't have an account? <span style={linkStyle}>Sign up for free</span></p>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '20px',
};

const loginCardStyle = {
  width: '100%',
  maxWidth: '420px',
  backgroundColor: 'white',
  padding: '48px',
  borderRadius: '24px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '32px',
};

const logoStyle = {
  width: '48px',
  height: '48px',
  backgroundColor: '#3b82f6',
  color: 'white',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: '800',
  margin: '0 auto 16px',
};

const titleStyle = {
  fontSize: '1.75rem',
  fontWeight: '800',
  color: '#0f172a',
  margin: '0 0 8px 0',
};

const subtitleStyle = {
  fontSize: '0.95rem',
  color: '#64748b',
  margin: 0,
};

const errorStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fef2f2',
  color: '#dc2626',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '0.9rem',
  marginBottom: '24px',
  border: '1px solid #fee2e2',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#334155',
};

const inputWrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  position: 'absolute',
  left: '16px',
  color: '#94a3b8',
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px 12px 48px',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

const buttonStyle = {
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px',
  backgroundColor: '#0f172a',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: '600',
  transition: 'all 0.2s ease',
};

const footerStyle = {
  marginTop: '32px',
  textAlign: 'center',
  fontSize: '0.9rem',
  color: '#64748b',
};

const linkStyle = {
  color: '#3b82f6',
  fontWeight: '600',
  cursor: 'pointer',
};

export default Login;
