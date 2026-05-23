import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const styles = `
  .notification-container { position: relative; display: inline-block; }

  .notification-bell {
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    position: relative;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  .notification-bell:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.05); }

  .bell-icon { display: inline-block; }

  .notification-badge {
    position: absolute;
    top: 0; right: 0;
    background: #F4B400;
    color: #0B3A66;
    font-size: 11px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 50%;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  .notification-dropdown {
    position: absolute;
    top: 45px; right: 0;
    width: 380px;
    max-height: 500px;
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow: hidden;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .notification-header {
    padding: 16px 20px;
    background: #0B3A66;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .notification-header h3 { margin: 0; font-size: 16px; font-weight: 600; }

  .mark-all-read {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #FFFFFF;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .mark-all-read:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.5); }

  .notification-list { max-height: 450px; overflow-y: auto; }

  .notification-item {
    padding: 16px 20px;
    display: flex;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #F0E8D8;
    position: relative;
  }
  .notification-item:hover { background: #FAF8F4; }
  .notification-item.unread { background: #FFF9E6; }

  .notification-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .notification-content { flex: 1; }
  .notification-title { font-weight: 600; color: #0B3A66; margin-bottom: 4px; font-size: 14px; }
  .notification-message { font-size: 13px; color: #6B5E4A; margin-bottom: 6px; line-height: 1.4; }
  .notification-time { font-size: 11px; color: #B8A88A; }

  .unread-dot {
    width: 8px; height: 8px;
    background: #F4B400;
    border-radius: 50%;
    position: absolute;
    top: 20px; right: 20px;
  }

  .no-notifications { text-align: center; padding: 60px 20px; color: #B8A88A; }
  .no-notifications p { margin: 0; font-size: 14px; }

  @media (max-width: 768px) {
    .notification-dropdown { width: 320px; right: -20px; }
  }
`;

const NotificationBell = ({ onOpenChat }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setNotifications(response.data.data);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/notifications/${notificationId}/read`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => n._id === notificationId ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/notifications/read-all', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleNotificationClick = async (notification) => {
    await markAsRead(notification._id);
    setIsOpen(false);
    if (notification.type === 'new_message') {
      if (onOpenChat && notification.relatedItemId) {
        onOpenChat(notification.relatedItemId, notification.senderId);
      }
    } else if (notification.relatedItemId) {
      const element = document.getElementById(`item-${notification.relatedItemId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-item');
        setTimeout(() => element.classList.remove('highlight-item'), 3000);
      }
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'potential_match': return '🔍';
      case 'item_claimed': return '✅';
      case 'new_message': return '💬';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'potential_match': return '#F4B400';
      case 'item_claimed': return '#2ECC71';
      case 'new_message': return '#3498DB';
      default: return '#0B3A66';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return past.toLocaleDateString();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="notification-container" ref={dropdownRef}>
        <button className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
          <span className="bell-icon">🔔</span>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
          )}
        </button>

        {isOpen && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <button className="mark-all-read" onClick={markAllAsRead}>Mark all as read</button>
              )}
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications"><p>No notifications yet</p></div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div
                      className="notification-icon"
                      style={{ backgroundColor: getNotificationColor(notification.type) }}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-time">{getTimeAgo(notification.createdAt)}</div>
                    </div>
                    {!notification.isRead && <div className="unread-dot" />}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationBell;
