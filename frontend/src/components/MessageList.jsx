/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://lostandfound-ipt-1.onrender.com';


const styles = `
  .message-list-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .message-list-modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .message-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #0B3A66;
    color: white;
  }

  .message-list-header h2 {
    font-size: 16px;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
  }

  .message-list-body {
    flex: 1;
    overflow-y: auto;
  }

  .conversation-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s;
  }

  .conversation-item:hover {
    background: #f8f8f8;
  }

  .conv-avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #0B3A66, #1a2a8a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .conv-content {
    flex: 1;
    min-width: 0;
  }

  .conv-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .conv-name {
    font-weight: 600;
    color: #0B3A66;
    font-size: 14px;
  }

  .conv-time {
    font-size: 11px;
    color: #999;
  }

  .conv-preview {
    font-size: 13px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .conv-arrow {
    color: #ccc;
    font-size: 18px;
  }

  .loading, .no-conversations {
    text-align: center;
    padding: 40px;
    color: #666;
  }

  .no-conversations .sub {
    font-size: 13px;
    color: #999;
    margin-top: 8px;
  }
`;

const MessageList = ({ item, onSelectChat, onClose }) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchConversations = React.useCallback(async () => {
        if (!item) return;
        try {
            const token = localStorage.getItem('token');
            const roomsRes = await axios.get('/api/chat/rooms', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (roomsRes.data.success) {
                const itemRooms = roomsRes.data.data.filter(
                    r => r.itemId === item._id || r.item?._id === item._id
                );
                setConversations(itemRooms);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }, [item]);

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]);

    const formatTime = (date) => {
        if (!date) return '';
        const now = new Date();
        const past = new Date(date);
        const mins = Math.floor((now - past) / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return past.toLocaleDateString();
    };

    return (
        <>
            <style>{styles}</style>

            <div className="message-list-overlay" onClick={onClose}>
                <div className="message-list-modal" onClick={(e) => e.stopPropagation()}>

                    <div className="message-list-header">
                        <h2>Messages: {item?.name}</h2>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="message-list-body">
                        {loading ? (
                            <p className="loading">Loading conversations...</p>
                        ) : conversations.length === 0 ? (
                            <div className="no-conversations">
                                <p>No messages yet</p>
                                <p className="sub">
                                    When someone shows interest in your item, their conversation will appear here
                                </p>
                            </div>
                        ) : (
                            conversations.map((conv) => {
                                const otherUser = conv.otherUser || {};
                                return (
                                    <div
                                        key={conv._id}
                                        className="conversation-item"
                                        onClick={() => onSelectChat(conv)}
                                    >
                                        <div className="conv-avatar">
                                            {(otherUser.name || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="conv-content">
                                            <div className="conv-header">
                                                <span className="conv-name">
                                                    {otherUser.name || 'Unknown User'}
                                                </span>
                                                <span className="conv-time">
                                                    {formatTime(conv.lastMessageTime)}
                                                </span>
                                            </div>
                                            <div className="conv-preview">
                                                {conv.lastMessage || 'No messages'}
                                            </div>
                                        </div>
                                        <span className="conv-arrow">›</span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default MessageList;
