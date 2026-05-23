/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const styles = `
  .chat-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .chat-modal-container {
    width: 100%;
    max-width: 500px;
    height: 600px;
    background: #FFFFFF;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    animation: chatSlideIn 0.3s ease;
  }

  @keyframes chatSlideIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .chat-header {
    background: linear-gradient(135deg, #0B3A66 0%, #0F4C80 100%);
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-header-info { flex: 1; }

  .chat-item-name {
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    margin-bottom: 2px;
  }

  .chat-with {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .chat-close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  .chat-messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px;
    background: #F0F2F5;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    animation: messageAppear 0.2s ease;
  }

  @keyframes messageAppear {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .message-row.own   { justify-content: flex-end; }
  .message-row.other { justify-content: flex-start; }

  .message-sender-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B3A66;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
    margin-bottom: 20px;
  }

  .message-wrapper {
    max-width: 70%;
    display: flex;
    flex-direction: column;
  }

  .message-sender-name {
    font-size: 11px;
    font-weight: 600;
    color: #65676B;
    margin-bottom: 4px;
    margin-left: 12px;
  }

  .message-bubble {
    padding: 10px 14px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
  }

  .own-bubble {
    background: #0084FF;
    color: #FFFFFF;
    border-bottom-right-radius: 4px;
  }

  .other-bubble {
    background: #E4E6EB;
    color: #050505;
    border-bottom-left-radius: 4px;
  }

  .auto-message-bubble {
    background: #EFF6FF !important;
    border-left: 3px solid #0B3A66 !important;
    color: #1e3a5f !important;
  }

  .message-text {
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  .message-time {
    font-size: 10px;
    margin-top: 6px;
    opacity: 0.7;
  }

  .own-bubble .message-time   { text-align: right; color: rgba(255,255,255,0.8); }
  .other-bubble .message-time { text-align: left; color: #65676B; }
  .auto-message-bubble .message-time { text-align: left; color: #6b7280; }

  .chat-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 16px;
    color: #65676B;
  }

  .spinner-small {
    width: 32px;
    height: 32px;
    border: 3px solid #E4E6EB;
    border-top-color: #0084FF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .chat-no-messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #65676B;
  }

  .no-messages-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
  .chat-no-messages p { margin: 0; font-size: 14px; }
  .no-messages-sub { font-size: 12px; margin-top: 4px; opacity: 0.7; }

  .chat-input-area {
    padding: 12px 16px;
    background: #FFFFFF;
    border-top: 1px solid #E4E6EB;
  }

  .chat-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #F0F2F5;
    border-radius: 24px;
    padding: 4px 8px 4px 16px;
  }

  .chat-input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px 0;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    max-height: 100px;
    outline: none;
  }

  .chat-input::placeholder { color: #65676B; }

  .chat-send-btn {
    background: #0084FF;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 16px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .chat-send-btn:hover:not(:disabled) { background: #0073E6; transform: scale(1.05); }
  .chat-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .chat-error {
    padding: 12px 20px;
    background: #FEE2E2;
    border-bottom: 1px solid #FCA5A5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .chat-error span { font-size: 13px; color: #991B1B; flex: 1; }
  .chat-error button {
    padding: 6px 12px;
    background: #991B1B;
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }

  .auto-message-note {
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
    padding: 4px 0 8px;
    font-style: italic;
  }

  .chat-messages-area::-webkit-scrollbar { width: 6px; }
  .chat-messages-area::-webkit-scrollbar-track { background: #F0F2F5; }
  .chat-messages-area::-webkit-scrollbar-thumb { background: #BCC0C4; border-radius: 3px; }

  @media (max-width: 768px) {
    .chat-modal-container { max-width: 95%; height: 85vh; border-radius: 16px; }
    .message-wrapper { max-width: 85%; }
    .message-bubble { padding: 8px 12px; }
    .message-text { font-size: 13px; }
  }
`;

const getAutoMessage = (item, currentUser) => {
  if (!item) return null;
  const name = currentUser?.name || 'Someone';
  if (item.category === 'lost') {
    return `Hi! I think I found your lost item "${item.name}" that was reported at ${item.location}. I'd like to help return it to you. Can we arrange a time to meet?`;
  } else {
    return `Hi! I believe the item "${item.name}" you found at ${item.location} belongs to me. I can provide details to verify it's mine. Can we arrange a pickup?`;
  }
};

const ChatModal = ({ isOpen, onClose, item, currentUser, onItemUpdate, initialRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const autoMessageSet = useRef(false);

  const isItemOwner = () => {
    if (!currentUser || !item) return false;
    return String(currentUser.id) === String(item.userId);
  };

  const loadChat = async () => {
    if (!item || !currentUser) return;
    setLoading(true);
    setError(null);
    autoMessageSet.current = false;

    try {
      const token = localStorage.getItem('token');
      const ownerId = item.userId;

      if (initialRoom) {
        setChatRoom(initialRoom);
        const msgRes = await axios.get(
          `/api/chat/messages/${initialRoom._id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (msgRes.data.success) setMessages(msgRes.data.data || []);
        else setMessages([]);
      } else if (isItemOwner()) {
        const roomsRes = await axios.get('/api/chat/rooms', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (roomsRes.data.success) {
          const itemRooms = roomsRes.data.data.filter(
            r => r.itemId === item._id || r.item?._id === item._id
          );
          if (itemRooms.length > 0) {
            setChatRoom(itemRooms[0]);
            const msgRes = await axios.get(
              `/api/chat/messages/${itemRooms[0]._id}`,
              { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (msgRes.data.success) setMessages(msgRes.data.data || []);
            else setMessages([]);
          } else {
            setMessages([]);
          }
        }
      } else {
        const roomRes = await axios.post('/api/chat/room', {
          itemId: item._id,
          ownerId: ownerId
        }, { headers: { 'Authorization': `Bearer ${token}` } });

        if (roomRes.data.success && roomRes.data.data) {
          const room = roomRes.data.data;
          setChatRoom(room);
          const existingMessages = room.messages || [];
          setMessages(existingMessages);

          // Auto-fill message if chat is new (no messages yet)
          if (existingMessages.length === 0 && !autoMessageSet.current) {
            autoMessageSet.current = true;
            const autoMsg = getAutoMessage(item, currentUser);
            if (autoMsg) setNewMessage(autoMsg);
          }
        }
      }
    } catch (err) {
      console.error('Load chat error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshMessages = async () => {
    if (!chatRoom?._id) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `/api/chat/messages/${chatRoom._id}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (res.data.success) setMessages(res.data.data || []);
    } catch (err) {}
  };

  useEffect(() => {
    if (isOpen && item) {
      loadChat();
      const interval = setInterval(refreshMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, item?._id, initialRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatRoom) return;
    setSending(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/chat/message', {
        roomId: chatRoom._id,
        message: newMessage.trim()
      }, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.data.success) {
        setMessages(prev => [...prev, res.data.data]);
        setNewMessage('');
      }
    } catch (err) {
      console.error('Send error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="chat-modal-overlay" onClick={onClose}>
        <div className="chat-modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-item-name">{item?.name}</div>
              <div className="chat-with">
                {initialRoom?.otherUser
                  ? `Chat with ${initialRoom.otherUser.name || initialRoom.otherUserName || 'User'}`
                  : isItemOwner() ? 'Messages from interested people' : 'Chat with owner'}
              </div>
            </div>
            <button className="chat-close-btn" onClick={onClose}>✕</button>
          </div>

          {error && (
            <div className="chat-error">
              <span>{error}</span>
              <button onClick={loadChat}>Retry</button>
            </div>
          )}

          <div className="chat-messages-area">
            {loading ? (
              <div className="chat-loading">
                <div className="spinner-small" />
                <p>Loading...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="chat-no-messages">
                <div className="no-messages-icon">💬</div>
                <p>No messages yet</p>
                <p className="no-messages-sub">
                  {isItemOwner()
                    ? 'When someone shows interest in your item, their messages will appear here'
                    : item?.category === 'lost'
                      ? 'Let the owner know you found their item!'
                      : 'Let the finder know this item belongs to you!'}
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isOwn = msg.senderId === currentUser?.id;
                return (
                  <div key={index} className={`message-row ${isOwn ? 'own' : 'other'}`}>
                    {!isOwn && (
                      <div className="message-sender-avatar">
                        {msg.senderName?.charAt(0) || '?'}
                      </div>
                    )}
                    <div className="message-wrapper">
                      {!isOwn && (
                        <div className="message-sender-name">
                          {msg.senderName || 'Unknown'}
                        </div>
                      )}
                      <div className={`message-bubble ${isOwn ? 'own-bubble' : 'other-bubble'}`}>
                        <div className="message-text">{msg.message}</div>
                        <div className="message-time">{formatTime(msg.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            {!isItemOwner() && messages.length === 0 && newMessage && (
              <div className="auto-message-note">✨ Suggested message — edit or send as is</div>
            )}
            <div className="chat-input-wrapper">
              <textarea
                className="chat-input"
                placeholder={
                  isItemOwner()
                    ? 'Type a message...'
                    : item?.category === 'lost'
                      ? 'Tell the owner you found their item...'
                      : 'Tell the finder this item is yours...'
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
              />
              <button
                className="chat-send-btn"
                onClick={sendMessage}
                disabled={sending || !newMessage.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatModal;