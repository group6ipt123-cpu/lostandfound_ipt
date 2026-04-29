import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatModal.css';

const ChatModal = ({ isOpen, onClose, item, currentUser, onItemUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimRequestSent, setClaimRequestSent] = useState(false);
  const [showVerificationPanel, setShowVerificationPanel] = useState(false);
  const [showClaimPanel, setShowClaimPanel] = useState(false);
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [claimDetails, setClaimDetails] = useState({
    location: '',
    date: '',
    time: '',
    additionalInfo: ''
  });
  const [sendingDetails, setSendingDetails] = useState(false);
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);
  const [error, setError] = useState(null);

  // Check if current user is the item owner
  const isItemOwner = () => {
    if (!currentUser || !item) return false;
    return String(currentUser.id) === String(item.userId);
  };

  // Load messages from server
  const loadMessages = async () => {
    if (!chatRoom?._id) {
      console.log('No chat room ID yet');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching messages for room:', chatRoom._id);
      
      const response = await axios.get(`http://localhost:5000/api/chat/messages/${chatRoom._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const newMessages = response.data.data;
        console.log('Messages loaded:', newMessages.length, 'messages');
        
        // Only update if there are new messages
        if (JSON.stringify(messages) !== JSON.stringify(newMessages)) {
          console.log('Updating messages...');
          setMessages(newMessages);
          scrollToBottom();
        }
        
        // Mark messages as read
        await axios.put(`http://localhost:5000/api/chat/messages/read/${chatRoom._id}`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  // Start polling for new messages
  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(() => {
      if (isOpen && chatRoom?._id) {
        console.log('Polling for new messages...');
        loadMessages();
      }
    }, 2000); // Poll every 2 seconds
  };

  // Stop polling
  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    if (isOpen && item) {
      console.log('=== CHAT MODAL OPENED ===');
      console.log('Item:', item.name);
      console.log('Current User:', currentUser?.name);
      console.log('Is Owner:', isItemOwner());
      loadChat();
      startPolling();
    }
    
    return () => {
      stopPolling();
    };
  }, [isOpen, item]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatRoom && !isItemOwner()) {
      checkClaimRequestSent();
    }
  }, [chatRoom, messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const loadChat = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Creating/getting chat room for item:', item._id);
      
      const roomResponse = await axios.post('http://localhost:5000/api/chat/room', {
        itemId: item._id,
        ownerId: item.userId
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Chat room response:', roomResponse.data);
      
      if (roomResponse.data.success) {
        const room = roomResponse.data.data;
        console.log('Chat room ID:', room._id);
        console.log('Participants:', room.participants);
        setChatRoom(room);
        
        // Load messages immediately
        await loadMessages();
      } else {
        console.log('Failed to create/get chat room:', roomResponse.data);
        setError(roomResponse.data.message);
      }
    } catch (err) {
      console.error('Error loading chat:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkClaimRequestSent = async () => {
    try {
      const hasClaimRequest = messages.some(msg => 
        msg.type === 'claim_request' && msg.senderId === currentUser?.id
      );
      setClaimRequestSent(hasClaimRequest);
    } catch (err) {
      console.error('Error checking claim request:', err);
    }
  };

  const sendMessage = async (message, type = 'normal') => {
    if (!message.trim()) return false;
    
    setSending(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending message to room:', chatRoom._id);
      console.log('Message type:', type);
      
      const response = await axios.post('http://localhost:5000/api/chat/message', {
        roomId: chatRoom._id,
        message: message,
        type: type
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        console.log('Message sent successfully');
        // Add message to local state immediately
        const newMsg = response.data.data;
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        scrollToBottom();
        
        // Force a reload after a short delay to ensure sync
        setTimeout(() => loadMessages(), 500);
        return true;
      } else {
        console.log('Failed to send message:', response.data);
        alert('Failed to send message: ' + response.data.message);
        return false;
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message: ' + (err.response?.data?.message || err.message));
      return false;
    } finally {
      setSending(false);
    }
  };

  const sendClaimRequest = async () => {
    if (!window.confirm('Send a claim request to the item owner?')) return;
    
    setClaimLoading(true);
    try {
      const message = `🔔 CLAIM REQUEST: ${currentUser?.name} would like to claim this item "${item?.name}".\n\nItem Details:\n- Name: ${item?.name}\n- Location: ${item?.location}\n- Date: ${new Date(item?.date).toLocaleDateString()}\n\nI believe this item belongs to me and can provide proof of ownership.`;
      
      const success = await sendMessage(message, 'claim_request');
      
      if (success) {
        setClaimRequestSent(true);
        alert('Claim request sent to the item owner!');
      }
    } catch (err) {
      console.error('Error sending claim request:', err);
      alert('Failed to send claim request');
    } finally {
      setClaimLoading(false);
    }
  };

  const sendVerificationQuestion = async () => {
    if (!verificationQuestion.trim()) {
      alert('Please enter a verification question');
      return;
    }
    
    setSendingDetails(true);
    try {
      const message = `❓ VERIFICATION QUESTION: ${verificationQuestion}\n\nPlease answer these questions to help verify that you are the rightful owner of this item.`;
      const success = await sendMessage(message, 'verification');
      
      if (success) {
        setVerificationQuestion('');
        setShowVerificationPanel(false);
        alert('Verification question sent!');
      }
    } catch (err) {
      console.error('Error sending verification:', err);
      alert('Failed to send verification question');
    } finally {
      setSendingDetails(false);
    }
  };

  const sendClaimDetails = async () => {
    if (!claimDetails.location || !claimDetails.date) {
      alert('Please provide location and date for claiming');
      return;
    }
    
    setSendingDetails(true);
    try {
      const message = `📍 CLAIM DETAILS:\n\n` +
        `Location: ${claimDetails.location}\n` +
        `Date: ${claimDetails.date}\n` +
        `Time: ${claimDetails.time || 'To be arranged'}\n` +
        `Additional Info: ${claimDetails.additionalInfo || 'None'}\n\n` +
        `Please confirm if these details work for you.`;
      
      const success = await sendMessage(message, 'claim_details');
      
      if (success) {
        setClaimDetails({ location: '', date: '', time: '', additionalInfo: '' });
        setShowClaimPanel(false);
        alert('Claim details sent successfully!');
      }
    } catch (err) {
      console.error('Error sending claim details:', err);
      alert('Failed to send claim details');
    } finally {
      setSendingDetails(false);
    }
  };

  const markItemAsClaimed = async () => {
    if (!window.confirm('Confirm this claim? This will mark the item as resolved.')) return;
    
    setClaimLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/items/${item._id}/mark-claimed`, {
        claimerId: currentUser.id
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        await sendMessage(
          `✅ CLAIM CONFIRMED: The claim for "${item?.name}" has been confirmed. The item has been marked as resolved. Please proceed with the claim details.`,
          'claim_confirmed'
        );
        alert('Item marked as resolved successfully!');
        if (onItemUpdate) onItemUpdate();
        setTimeout(() => onClose(), 2000);
      } else {
        alert(response.data.message || 'Failed to mark as resolved');
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setClaimLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(newMessage, 'normal');
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get chat partner name
  const getChatPartnerName = () => {
    if (isItemOwner()) {
      const claimRequest = messages.find(m => m.type === 'claim_request');
      if (claimRequest) {
        return claimRequest.senderName;
      }
      return 'Someone';
    } else {
      // For claimant, show the item owner's name
      return item?.userName;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-item-name">{item?.name}</div>
            <div className="chat-with">
              Chat with {getChatPartnerName()}
            </div>
          </div>
          <button className="chat-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="chat-error">
            <span>⚠️ Error: {error}</span>
            <button onClick={() => loadChat()}>Retry</button>
          </div>
        )}

        {/* Item Status Badge */}
        <div className="chat-item-status">
          <span className={`status-badge ${item?.status === 'claimed' ? 'claimed' : 'pending'}`}>
            {item?.status === 'claimed' ? '✓ Item Resolved' : '📌 Item Pending'}
          </span>
          {isItemOwner() && messages.some(m => m.type === 'claim_request' && !m.read) && (
            <span className="new-claim-alert">🔔 New Claim Request!</span>
          )}
        </div>

        {/* Messages Area */}
        <div className="chat-messages-area">
          {loading ? (
            <div className="chat-loading">
              <div className="spinner-small"></div>
              <p>Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="chat-no-messages">
              <div className="no-messages-icon">💬</div>
              <p>No messages yet</p>
              <p className="no-messages-sub">
                {isItemOwner() 
                  ? "When someone sends a claim request, it will appear here" 
                  : "Send a claim request or message to the item owner"}
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isOwn = msg.senderId === currentUser?.id;
              const isClaimRequest = msg.type === 'claim_request';
              const isVerification = msg.type === 'verification';
              const isClaimDetails = msg.type === 'claim_details';
              const isClaimConfirmed = msg.type === 'claim_confirmed';
              
              let bubbleClass = '';
              let headerText = '';
              
              if (isClaimRequest) {
                bubbleClass = 'claim-request-bubble';
                headerText = '🔔 CLAIM REQUEST';
              }
              if (isVerification) {
                bubbleClass = 'verification-bubble';
                headerText = '❓ VERIFICATION QUESTION';
              }
              if (isClaimDetails) {
                bubbleClass = 'claim-details-bubble';
                headerText = '📍 CLAIM DETAILS';
              }
              if (isClaimConfirmed) {
                bubbleClass = 'claim-confirmed-bubble';
                headerText = '✅ CLAIM CONFIRMED';
              }
              
              return (
                <div key={index} className={`message-row ${isOwn ? 'own' : 'other'}`}>
                  {!isOwn && (
                    <div className="message-sender-avatar">
                      {msg.senderName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="message-wrapper">
                    {!isOwn && (
                      <div className="message-sender-name">{msg.senderName}</div>
                    )}
                    <div className={`message-bubble ${isOwn ? 'own-bubble' : 'other-bubble'} ${bubbleClass}`}>
                      {headerText && <div className="message-header">{headerText}</div>}
                      <div className="message-text">{msg.message}</div>
                      <div className="message-time">{formatTime(msg.createdAt)}</div>
                    </div>
                  </div>
                  {isOwn && (
                    <div className="message-status">
                      {msg.read ? '✓✓' : '✓'}
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            <button 
              className="chat-send-btn" 
              onClick={() => sendMessage(newMessage, 'normal')} 
              disabled={sending || !newMessage.trim()}
            >
              {sending ? '...' : '➤'}
            </button>
          </div>
        </div>

        {/* Claimant Actions */}
        {!isItemOwner() && item?.status !== 'claimed' && !claimRequestSent && (
          <div className="chat-action-buttons">
            <button 
              className="chat-claim-request-btn"
              onClick={sendClaimRequest}
              disabled={claimLoading}
            >
              {claimLoading ? 'Sending...' : '📝 Request to Claim'}
            </button>
          </div>
        )}

        {!isItemOwner() && item?.status !== 'claimed' && claimRequestSent && (
          <div className="chat-action-buttons">
            <div className="claim-request-sent">
              <span>✓ Claim request sent! The owner will contact you.</span>
            </div>
          </div>
        )}

        {/* Owner Panels */}
        {isItemOwner() && item?.status !== 'claimed' && (
          <div className="chat-owner-panels">
            <button 
              className="chat-panel-toggle"
              onClick={() => setShowVerificationPanel(!showVerificationPanel)}
            >
              {showVerificationPanel ? '− Close' : '+ Ask Verification Question'}
            </button>
            
            {showVerificationPanel && (
              <div className="chat-panel">
                <h4>Ask Verification Question</h4>
                <textarea
                  className="chat-panel-textarea"
                  placeholder="Ask a question to verify ownership (e.g., What color is the item? Any distinguishing marks?)"
                  value={verificationQuestion}
                  onChange={(e) => setVerificationQuestion(e.target.value)}
                  rows="3"
                />
                <button 
                  className="chat-panel-send"
                  onClick={sendVerificationQuestion}
                  disabled={sendingDetails}
                >
                  {sendingDetails ? 'Sending...' : 'Send Question'}
                </button>
              </div>
            )}

            <button 
              className="chat-panel-toggle"
              onClick={() => setShowClaimPanel(!showClaimPanel)}
            >
              {showClaimPanel ? '− Close' : '+ Arrange Claim Pickup'}
            </button>
            
            {showClaimPanel && (
              <div className="chat-panel">
                <h4>Arrange Claim Pickup</h4>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={claimDetails.location}
                  onChange={(e) => setClaimDetails({...claimDetails, location: e.target.value})}
                  className="chat-panel-input"
                />
                <div className="chat-panel-row">
                  <input
                    type="date"
                    placeholder="Date"
                    value={claimDetails.date}
                    onChange={(e) => setClaimDetails({...claimDetails, date: e.target.value})}
                    className="chat-panel-date"
                  />
                  <input
                    type="time"
                    placeholder="Time"
                    value={claimDetails.time}
                    onChange={(e) => setClaimDetails({...claimDetails, time: e.target.value})}
                    className="chat-panel-time"
                  />
                </div>
                <textarea
                  placeholder="Additional instructions"
                  value={claimDetails.additionalInfo}
                  onChange={(e) => setClaimDetails({...claimDetails, additionalInfo: e.target.value})}
                  className="chat-panel-textarea"
                  rows="2"
                />
                <button 
                  className="chat-panel-send"
                  onClick={sendClaimDetails}
                  disabled={sendingDetails}
                >
                  {sendingDetails ? 'Sending...' : 'Send Claim Details'}
                </button>
              </div>
            )}

            {messages.some(m => m.type === 'claim_request') && (
              <button 
                className="chat-confirm-btn"
                onClick={markItemAsClaimed}
                disabled={claimLoading}
              >
                {claimLoading ? 'Processing...' : '✓ Confirm Claim & Mark as Resolved'}
              </button>
            )}
          </div>
        )}

        {/* Resolved Badge */}
        {item?.status === 'claimed' && (
          <div className="chat-resolved-badge">
            <span>✓ This item has been marked as resolved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatModal;