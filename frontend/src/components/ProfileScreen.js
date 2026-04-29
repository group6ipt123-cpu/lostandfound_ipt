import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    contactNumber: ''
  });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login first');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateStatus('updating');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
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
    } catch (err) {
      setUpdateStatus('error');
      setTimeout(() => setUpdateStatus(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/login'}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {!isEditing ? (
            /* View Mode */
            <div className="profile-view">
              <div className="profile-info-section">
                <div className="info-group">
                  <label>Full Name</label>
                  <div className="info-value">{user?.name || 'Not set'}</div>
                </div>
                
                <div className="info-group">
                  <label>Email Address</label>
                  <div className="info-value">{user?.email}</div>
                </div>
                
                <div className="info-group">
                  <label>Student ID</label>
                  <div className="info-value">{user?.studentId || 'Not set'}</div>
                </div>
                
                <div className="info-group">
                  <label>Contact Number</label>
                  <div className="info-value">{user?.contactNumber || 'Not set'}</div>
                </div>
                
                <div className="info-group">
                  <label>Role</label>
                  <div className="info-value role-badge">{user?.role === 'admin' ? 'Administrator' : 'User'}</div>
                </div>
              </div>

              {/* Statistics Section */}
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
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form className="profile-edit" onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                />
                <small>Format: XX-XXXXX-XXX</small>
              </div>
              
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                />
                <small>Philippine mobile number (e.g., 09123456789)</small>
              </div>

              {updateStatus === 'updating' && (
                <div className="update-status updating">Updating profile...</div>
              )}
              {updateStatus === 'success' && (
                <div className="update-status success">Profile updated successfully!</div>
              )}
              {updateStatus === 'error' && (
                <div className="update-status error">Failed to update profile. Please try again.</div>
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
                    setFormData({
                      name: user?.name || '',
                      studentId: user?.studentId || '',
                      contactNumber: user?.contactNumber || ''
                    });
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
  );
};

export default ProfileScreen;