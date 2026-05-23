import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import NotificationBell from './NotificationBell';

/* eslint-disable react-hooks/exhaustive-deps */

const styles = `
  /* Messages Dropdown Styles */
  .messages-dropdown-container {
    position: relative;
    display: inline-block;
  }

  .messages-btn {
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    position: relative;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    color: #FFFFFF;
  }

  .messages-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .messages-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #F4B400;
    color: #0B3A66;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 50%;
    min-width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 1s infinite;
  }

  .messages-dropdown {
    position: absolute;
    top: 45px;
    right: 0;
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
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .messages-header {
    padding: 16px 20px;
    background: #0B3A66;
    color: #FFFFFF;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .messages-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .no-messages-text {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
    display: block;
  }

  .messages-list {
    max-height: 450px;
    overflow-y: auto;
  }

  .message-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #F0E8D8;
    position: relative;
  }

  .message-item:hover {
    background: #FAF8F4;
    transform: translateX(2px);
  }

  .message-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B3A66;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .message-content {
    flex: 1;
    min-width: 0;
  }

  .message-sender-name {
    font-weight: 600;
    color: #0B3A66;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .message-preview {
    font-size: 12px;
    color: #8E8068;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .message-item-time {
    font-size: 10px;
    color: #B8A88A;
    margin-top: 4px;
  }

  .message-item-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .item-name-badge {
    font-size: 10px;
    background: #E8DFD0;
    padding: 2px 8px;
    border-radius: 12px;
    color: #5C4F3A;
    white-space: nowrap;
  }

  .no-messages {
    text-align: center;
    padding: 40px 20px;
    color: #B8A88A;
  }

  .no-messages p {
    margin: 0;
    font-size: 14px;
  }

  .no-messages-sub {
    font-size: 12px;
    margin-top: 8px;
    opacity: 0.7;
  }

  /* Scrollbar */
  .messages-list::-webkit-scrollbar {
    width: 6px;
  }

  .messages-list::-webkit-scrollbar-track {
    background: #F0F2F5;
  }

  .messages-list::-webkit-scrollbar-thumb {
    background: #BCC0C4;
    border-radius: 3px;
  }

  .messages-list::-webkit-scrollbar-thumb:hover {
    background: #8F959E;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .messages-dropdown {
      width: 320px;
      right: -60px;
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      font-size: 14px;
    }

    .message-sender-name {
      font-size: 13px;
    }
  }
`;

const MainLayout = ({ children, onOpenChatFromNotification }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [chatRooms, setChatRooms] = useState([]);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [loadingChats, setLoadingChats] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchChatRooms();
      const interval = setInterval(fetchChatRooms, 15000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMessagesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchChatRooms = async () => {
    if (loadingChats) return;
    setLoadingChats(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/chat/rooms', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setChatRooms(response.data.data);

        let unread = 0;
        for (const room of response.data.data) {
          const messagesResponse = await axios.get(
            `/api/chat/messages/${room._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (messagesResponse.data.success) {
            const unreadCount = messagesResponse.data.data.filter(
              (m) => !m.read && m.senderId !== user?.id
            ).length;
            unread += unreadCount;
          }
        }
        setUnreadMessagesCount(unread);
      }
    } catch (err) {
      console.error('Error fetching chat rooms:', err);
    } finally {
      setLoadingChats(false);
    }
  };

  const openChatRoom = (itemId, ownerId) => {
    setShowMessagesDropdown(false);
    if (onOpenChatFromNotification) {
      onOpenChatFromNotification(itemId, ownerId);
    }
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return past.toLocaleDateString();
  };

  return (
    <>
      <style>{styles}</style>

      <div className="main-layout">
        <header className="main-header">
          <div className="header-container">
            <div className="logo-container" onClick={() => navigate('/dashboard')}>
              <span className="logo">
                Lost<span>&</span>Found
              </span>
            </div>

            <div className="header-nav">
              <button
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              {user?.role === 'admin' && (
                <button
                  className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </button>
              )}
            </div>

            <div className="header-right">
              {/* Messages Dropdown */}
              <div className="messages-dropdown-container" ref={dropdownRef}>
                <button
                  className="messages-btn"
                  onClick={() => {
                    setShowMessagesDropdown(!showMessagesDropdown);
                    if (!showMessagesDropdown) fetchChatRooms();
                  }}
                >
                  💬
                  {unreadMessagesCount > 0 && (
                    <span className="messages-badge">
                      {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}
                    </span>
                  )}
                </button>

                {showMessagesDropdown && (
                  <div className="messages-dropdown">
                    <div className="messages-header">
                      <h3>Messages</h3>
                    </div>
                    <div className="messages-list">
                      {chatRooms.length === 0 ? (
                        <div className="no-messages">
                          <p>No messages yet</p>
                          <p className="no-messages-sub">
                            Start a conversation by clicking "Chat" on any item
                          </p>
                        </div>
                      ) : (
                        chatRooms.map((room) => (
                          <div
                            key={room._id}
                            className="message-item"
                            onClick={() => openChatRoom(room.itemId, room.otherUser?.id)}
                          >
                            <div className="message-avatar">
                              {room.otherUser?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="message-content">
                              <div className="message-sender-name">
                                {room.otherUser?.name || 'User'}
                              </div>
                              <div className="message-preview">
                                {room.lastMessage || 'No messages yet'}
                              </div>
                              <div className="message-item-time">
                                {getTimeAgo(room.lastMessageTime)}
                              </div>
                            </div>
                            <div className="message-item-badge">
                              <span className="item-name-badge">{room.item?.name}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <NotificationBell onOpenChat={onOpenChatFromNotification} />

              <div
                className="user-profile"
                onClick={() => navigate('/profile')}
                style={{ cursor: 'pointer' }}
              >
                <div className="user-avatar">{getInitials(user?.name)}</div>
                <div className="user-info">
                  <div className="user-name">{user?.name?.split(' ')[0] || 'User'}</div>
                  <div className="user-role">{user?.role === 'admin' ? 'Admin' : 'User'}</div>
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
