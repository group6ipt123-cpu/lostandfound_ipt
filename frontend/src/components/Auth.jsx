import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .auth-page {
    min-height: 100vh;
    display: flex;
    background: #f7f8fc;
  }

  .auth-brand {
    width: 42%;
    min-height: 100vh;
    background: linear-gradient(160deg, #0B3A66 0%, #0a3059 55%, #072544 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 44px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .auth-brand::before {
    content: '';
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    border: 1.5px solid rgba(244, 180, 0, 0.12);
    top: -100px;
    right: -120px;
  }

  .auth-brand::after {
    content: '';
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.07);
    bottom: 60px;
    left: -80px;
  }

  .brand-top { position: relative; z-index: 1; }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-badge {
    width: 46px;
    height: 46px;
    background: linear-gradient(135deg, #F4B400 0%, #C89B2B 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 16px;
    color: #0B3A66;
    box-shadow: 0 6px 20px rgba(244, 180, 0, 0.35);
    letter-spacing: 0.5px;
  }

  .logo-name {
    font-size: 15px;
    font-weight: 700;
    color: white;
    letter-spacing: 0.4px;
  }

  .logo-tagline {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .brand-middle { position: relative; z-index: 1; }

  .brand-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(30px, 3.5vw, 40px);
    color: white;
    line-height: 1.2;
    margin-bottom: 16px;
    font-weight: 400;
  }

  .brand-headline em {
    font-style: italic;
    color: #F4B400;
  }

  .brand-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    font-weight: 300;
    max-width: 280px;
  }

  .brand-stats {
    display: flex;
    gap: 28px;
    margin-top: 36px;
  }

  .stat { display: flex; flex-direction: column; gap: 3px; }

  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: #F4B400;
    font-weight: 400;
  }

  .stat-label {
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 500;
  }

  .brand-bottom {
    position: relative;
    z-index: 1;
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    font-weight: 300;
  }

  .auth-form-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 36px;
    overflow-y: auto;
  }

  .auth-form-inner {
    width: 100%;
    max-width: 420px;
    animation: fadeUp 0.45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-heading { margin-bottom: 32px; }

  .form-heading h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 30px;
    color: #0B3A66;
    font-weight: 400;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .form-heading p {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 300;
  }

  .auth-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    padding: 11px 14px;
    border-radius: 10px;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 13px;
    color: #b91c1c;
  }

  .error-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ef4444;
    flex-shrink: 0;
  }

  .auth-form { margin-bottom: 22px; }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .form-group { margin-bottom: 16px; }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #374151;
    font-size: 12px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-wrapper input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: white;
    color: #1f2937;
  }

  .input-wrapper input:focus {
    outline: none;
    border-color: #0B3A66;
    box-shadow: 0 0 0 3px rgba(11, 58, 102, 0.08);
  }

  .input-wrapper input::placeholder {
    color: #d1d5db;
    font-weight: 300;
  }

  .input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    opacity: 0.35;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  .mail-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
  }

  .lock-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'/%3E%3C/svg%3E");
  }

  .id-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z'/%3E%3C/svg%3E");
  }

  .phone-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/%3E%3C/svg%3E");
  }

  .form-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0 18px;
    color: #d1d5db;
    font-size: 11px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .form-divider::before,
  .form-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  .auth-submit {
    width: 100%;
    padding: 13px;
    background: #0B3A66;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .auth-submit:hover:not(:disabled) {
    background: #0d4478;
    box-shadow: 0 6px 18px rgba(11, 58, 102, 0.3);
    transform: translateY(-1px);
  }

  .auth-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .auth-footer {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    font-weight: 300;
  }

  .auth-footer .toggle-button {
    color: #0B3A66;
    font-weight: 700;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }

  .auth-footer .toggle-button:hover {
    text-decoration: underline;
  }

  .demo-note {
    text-align: center;
    margin-top: 10px;
    font-size: 11px;
    color: #d1d5db;
    font-weight: 300;
  }

  .spinner-small {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .auth-page { flex-direction: column; }

    .auth-brand {
      width: 100%;
      min-height: unset;
      padding: 28px 24px 32px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .auth-brand::before,
    .auth-brand::after { display: none; }

    .brand-middle,
    .brand-bottom,
    .brand-stats { display: none; }

    .auth-form-panel { padding: 32px 20px 40px; }

    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
`;

const BrandPanel = () => (
  <div className="auth-brand">
    <div className="brand-top">
      <div className="brand-logo">
        <div className="logo-badge">L&F</div>
        <div>
          <div className="logo-name">Lost & Found</div>
          <div className="logo-tagline">Campus System</div>
        </div>
      </div>
    </div>
    <div className="brand-middle">
      <h2 className="brand-headline">
        Reuniting people<br />with their <em>lost</em> things
      </h2>
      <p className="brand-desc">
        A smarter way to report, track, and recover lost items across campus — fast and hassle-free.
      </p>
      <div className="brand-stats">
        <div className="stat">
          <span className="stat-num">94%</span>
          <span className="stat-label">Recovery rate</span>
        </div>
        <div className="stat">
          <span className="stat-num">2.4k</span>
          <span className="stat-label">Items returned</span>
        </div>
      </div>
    </div>
    <div className="brand-bottom">
      © {new Date().getFullYear()} Campus Lost & Found
    </div>
  </div>
);

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    studentId: '', contactNumber: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);
    if (!result.success) {
      setError(result.message);
    } else {
      setSuccess('Successfully registered! Continue to log in.');
      setFormData({
        name: '', email: '', password: '', confirmPassword: '',
        studentId: '', contactNumber: ''
      });
      setTimeout(() => navigate('/login'), 2500);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        <BrandPanel />
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <div className="form-heading">
              <h2>Create an account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {error && (
              <div className="auth-error">
                <span className="error-dot" />
                {error}
              </div>
            )}

            {success && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                padding: '11px 14px',
                borderRadius: '10px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                fontSize: '13px',
                color: '#15803d'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0, display: 'inline-block' }} />
                {success}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon id-icon" />
                    <input type="text" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Juan dela Cruz" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <div className="input-wrapper">
                    <span className="input-icon id-icon" />
                    <input type="text" name="studentId" value={formData.studentId}
                      onChange={handleChange} placeholder="2021-00001" required />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrapper">
                    <span className="input-icon mail-icon" />
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="you@school.edu" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <div className="input-wrapper">
                    <span className="input-icon phone-icon" />
                    <input type="tel" name="contactNumber" value={formData.contactNumber}
                      onChange={handleChange} placeholder="09XXXXXXXXX" required />
                  </div>
                </div>
              </div>

              <div className="form-divider">Security</div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <span className="input-icon lock-icon" />
                    <input type="password" name="password" value={formData.password}
                      onChange={handleChange} placeholder="Min. 6 characters" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-wrapper">
                    <span className="input-icon lock-icon" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange} placeholder="Repeat password" required />
                  </div>
                </div>
              </div>

              <button type="submit" className="auth-submit" disabled={loading || !!success} style={{ marginTop: 4 }}>
                {loading ? <span className="spinner-small" /> : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer">
              Already have an account?{' '}
              <button className="toggle-button" onClick={() => navigate('/login')}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (!result.success) setError(result.message);
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        <BrandPanel />
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <div className="form-heading">
              <h2>Welcome back</h2>
              <p>Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="auth-error">
                <span className="error-dot" />
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <span className="input-icon mail-icon" />
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Enter your email" required />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <span className="input-icon lock-icon" />
                  <input type="password" name="password" value={formData.password}
                    onChange={handleChange} placeholder="Enter your password" required />
                </div>
              </div>

              <button type="submit" className="auth-submit" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? <span className="spinner-small" /> : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account?{' '}
              <button className="toggle-button" onClick={() => navigate('/register')}>Register</button>
            </div>

            <div className="demo-note">
              Demo: admin@example.com / admin123
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
