import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://lostandfound-ipt-1.onrender.com';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .profile-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
    padding: 40px 20px;
    font-family: 'Inter', sans-serif;
  }

  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(11, 58, 102, 0.1);
  }

  .profile-header {
    background: linear-gradient(135deg, #0B3A66 0%, #0F4C80 100%);
    padding: 40px;
    text-align: center;
    color: #FFFFFF;
  }

  .profile-avatar {
    width: 100px; height: 100px;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    font-size: 48px; font-weight: 700;
    color: #0B3A66;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .profile-header h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px; font-weight: 700;
    margin-bottom: 8px;
  }
  .profile-header p { font-size: 14px; opacity: 0.8; }

  .profile-content { padding: 32px; }

  .profile-info-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .info-group { border-bottom: 2px solid #F0E8D8; padding-bottom: 12px; }
  .info-group label {
    display: block;
    font-size: 12px; font-weight: 600;
    color: #8E8068;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 8px;
  }
  .info-value { font-size: 16px; font-weight: 500; color: #0B3A66; word-break: break-word; }

  .role-badge {
    display: inline-block;
    background: #F4B400; color: #0B3A66;
    padding: 4px 12px; border-radius: 20px;
    font-size: 12px; font-weight: 600;
  }

  .profile-stats { margin-bottom: 32px; }
  .profile-stats h3 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 18px; font-weight: 700;
    color: #0B3A66; margin-bottom: 16px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  .stat-card {
    background: linear-gradient(135deg, #FAF8F4 0%, #F5F0E8 100%);
    border-radius: 16px; padding: 20px;
    text-align: center;
    border: 1px solid #E8DFD0;
  }
  .stat-number {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 32px; font-weight: 800;
    color: #F4B400; margin-bottom: 8px;
  }
  .stat-label { font-size: 12px; color: #8E8068; font-weight: 500; }

  .profile-actions { display: flex; gap: 16px; justify-content: center; }

  .edit-btn, .logout-btn {
    padding: 12px 24px; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease; font-family: 'Inter', sans-serif;
  }
  .edit-btn { background: #0B3A66; color: #FFFFFF; }
  .edit-btn:hover { background: #0F4C80; transform: translateY(-2px); }
  .logout-btn { background: #C0392B; color: #FFFFFF; }
  .logout-btn:hover { background: #A93226; transform: translateY(-2px); }

  .profile-edit { display: flex; flex-direction: column; gap: 20px; }

  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group label { font-size: 14px; font-weight: 600; color: #0B3A66; }
  .form-group input {
    padding: 12px 16px;
    border: 2px solid #E8DFD0; border-radius: 12px;
    font-size: 14px; font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
  }
  .form-group input:focus {
    outline: none; border-color: #0B3A66;
    box-shadow: 0 0 0 3px rgba(11, 58, 102, 0.1);
  }
  .form-group small { font-size: 11px; color: #8E8068; }

  .update-status {
    padding: 12px; border-radius: 10px;
    font-size: 13px; font-weight: 500; text-align: center;
  }
  .update-status.updating { background: #E8F4FD; color: #0B3A66; }
  .update-status.success { background: #D1FAE5; color: #065F46; }
  .update-status.error { background: #FEE2E2; color: #991B1B; }

  .form-actions { display: flex; gap: 16px; margin-top: 8px; }
  .save-btn, .cancel-btn {
    flex: 1; padding: 12px 24px; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.2s ease; font-family: 'Inter', sans-serif;
  }
  .save-btn { background: #2ECC71; color: #FFFFFF; }
  .save-btn:hover:not(:disabled) { background: #27AE60; transform: translateY(-2px); }
  .save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .cancel-btn { background: #E8DFD0; color: #5C4F3A; }
  .cancel-btn:hover { background: #D4C4A8; transform: translateY(-2px); }

  .profile-loading {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
  }
  .profile-loading .spinner {
    width: 48px; height: 48px;
    border: 3px solid #E8DFD0; border-top-color: #0B3A66;
    border-radius: 50%; animation: spin 0.8s linear infinite;
    margin-bottom: 16px;
  }
  .profile-loading p { color: #8E8068; }

  @keyframes spin { to { transform: rotate(360deg); } }

  .profile-error {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
    text-align: center;
  }
  .error-icon { font-size: 64px; margin-bottom: 16px; }
  .profile-error p { color: #C0392B; margin-bottom: 20px; font-size: 16px; }
  .profile-error button {
    padding: 12px 24px; background: #0B3A66; color: #FFFFFF;
    border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s ease;
  }
  .profile-error button:hover { background: #0F4C80; transform: translateY(-2px); }

  @media (max-width: 768px) {
    .profile-container { margin: 0 16px; }
    .profile-header { padding: 30px 20px; }
    .profile-content { padding: 24px; }
    .profile-info-section { grid-template-columns: 1fr; gap: 16px; }
    .stats-grid { grid-template-columns: 1fr; }
    .profile-actions { flex-direction: column; }
    .form-actions { flex-direction: column; }
  }
`;

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', studentId: '', contactNumber: '' });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setError('Please login first'); setLoading(false); return; }
    try {
      const response = await axios.get('/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(response.data.data);
        setFormData({
          name: response.data.data.name || '',
          studentId: response.data.data.studentId || '',
          contactNumber: response.data.data.contactNumber || ''
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateStatus('updating');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/profile', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(response.data.data);
        setIsEditing(false);
        setUpdateStatus('success');
        setTimeout(() => setUpdateStatus(''), 3000);
      } else {
        setUpdateStatus('error');
        setTimeout(() => setUpdateStatus(''), 3000);
      }
    } catch {
      setUpdateStatus('error');
      setTimeout(() => setUpdateStatus(''), 3000);
    }
  };

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="profile-loading">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{styles}</style>
      <div className="profile-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/login'}>Go to Login</button>
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <h1>My Profile</h1>
            <p>Manage your account information</p>
          </div>

          <div className="profile-content">
            {!isEditing ? (
              <div className="profile-view">
                <div className="profile-info-section">
                  {[
                    { label: 'Full Name', value: user?.name || 'Not set' },
                    { label: 'Email Address', value: user?.email },
                    { label: 'Student ID', value: user?.studentId || 'Not set' },
                    { label: 'Contact Number', value: user?.contactNumber || 'Not set' },
                  ].map(({ label, value }) => (
                    <div className="info-group" key={label}>
                      <label>{label}</label>
                      <div className="info-value">{value}</div>
                    </div>
                  ))}
                  <div className="info-group">
                    <label>Role</label>
                    <div className="info-value">
                      <span className="role-badge">{user?.role === 'admin' ? 'Administrator' : 'User'}</span>
                    </div>
                  </div>
                </div>

                {user?.stats && (
                  <div className="profile-stats">
                    <h3>Activity Statistics</h3>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-number">{user.stats.itemsReported || 0}</div>
                        <div className="stat-label">Items Reported</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">{user.stats.itemsClaimed || 0}</div>
                        <div className="stat-label">Items Claimed</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">{user.stats.unreadNotifications || 0}</div>
                        <div className="stat-label">Unread Notifications</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="profile-actions">
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
                </div>
              </div>
            ) : (
              <form className="profile-edit" onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input type="text" name="studentId" value={formData.studentId} onChange={handleInputChange} placeholder="Enter your student ID" />
                  <small>Format: XX-XXXXX-XXX</small>
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Enter your contact number" />
                  <small>Philippine mobile number (e.g., 09123456789)</small>
                </div>

                {updateStatus && (
                  <div className={`update-status ${updateStatus}`}>
                    {updateStatus === 'updating' && 'Updating profile...'}
                    {updateStatus === 'success' && 'Profile updated successfully!'}
                    {updateStatus === 'error' && 'Failed to update profile. Please try again.'}
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="save-btn" disabled={updateStatus === 'updating'}>
                    {updateStatus === 'updating' ? 'Saving...' : '💾 Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user?.name || '', studentId: user?.studentId || '', contactNumber: user?.contactNumber || '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
