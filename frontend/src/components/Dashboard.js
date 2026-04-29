import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatModal from './ChatModal';
import './Dashboard.css';

const Dashboard = ({ registerChatHandler }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMode, setReportMode] = useState('lost');
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, lost: 0, found: 0 });

  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'lost',
    itemCategory: 'others',
    location: '',
    date: new Date().toISOString().split('T')[0],
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [scrollToItemId, setScrollToItemId] = useState(null);

  // Helper to clean ObjectId strings
  const cleanId = (id) => {
    if (!id) return '';
    return String(id).replace(/ObjectId\("|"\)/g, '').trim();
  };

  // Helper to check if current user is the item owner
  const isItemOwner = (item) => {
    if (!user || !user.id || !item || !item.userId) {
      return false;
    }
    const currentUserId = cleanId(user.id);
    const itemOwnerId = cleanId(item.userId);
    return currentUserId === itemOwnerId;
  };

  useEffect(() => {
    if (registerChatHandler) {
      registerChatHandler(openChatFromNotification);
    }
  }, [registerChatHandler, user]);

  useEffect(() => {
    fetchUser();
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, categoryFilter, typeFilter]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (scrollToItemId && filteredItems.length > 0) {
      const element = document.getElementById(`item-${scrollToItemId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-item');
        setTimeout(() => {
          element.classList.remove('highlight-item');
        }, 3000);
      }
      setScrollToItemId(null);
    }
  }, [filteredItems, scrollToItemId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        const userData = response.data.data;
        console.log('User fetched:', userData);
        
        // Ensure id is set (use _id if id doesn't exist)
        setUser({
          ...userData,
          id: userData.id || userData._id
        });
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        console.log('Items fetched:', response.data.data);
        setItems(response.data.data);
        const lostCount = response.data.data.filter(i => i.category === 'lost').length;
        const foundCount = response.data.data.filter(i => i.category === 'found').length;
        setStats({
          total: response.data.data.length,
          lost: lostCount,
          found: foundCount
        });
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.itemCategory === typeFilter);
    }

    setFilteredItems(filtered);
  };

  const openChat = async (item) => {
    // Allow both owner and non-owners to open chat
    // Owner can reply to chats about their post
    setSelectedItem(item);
    setShowChatModal(true);

    try {
      const token = localStorage.getItem('token');
      const roomResponse = await axios.post(
        'http://localhost:5000/api/chat/room',
        { itemId: item._id, ownerId: item.userId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (roomResponse.data.success) {
        setChatRoom(roomResponse.data.data);
        const messagesResponse = await axios.get(
          `http://localhost:5000/api/chat/messages/${roomResponse.data.data._id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (messagesResponse.data.success) {
          setMessages(messagesResponse.data.data);
          await axios.put(
            `http://localhost:5000/api/chat/messages/read/${roomResponse.data.data._id}`,
            {},
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
        }
      }
    } catch (err) {
      console.error('Error opening chat:', err);
      alert('Error opening chat: ' + (err.response?.data?.message || err.message));
    }
  };

  const openChatFromNotification = async (itemId, senderId) => {
    let item = items.find(i => i._id === itemId);

    if (!item) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/items/${itemId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.success) {
          item = response.data.data;
        } else {
          alert('Item not found');
          return;
        }
      } catch (err) {
        console.error(err);
        alert('Error opening chat');
        return;
      }
    }

    setSelectedItem(item);
    setShowChatModal(true);

    try {
      const token = localStorage.getItem('token');
      const roomResponse = await axios.post(
        'http://localhost:5000/api/chat/room',
        { itemId: item._id, ownerId: item.userId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (roomResponse.data.success) {
        setChatRoom(roomResponse.data.data);
        const messagesResponse = await axios.get(
          `http://localhost:5000/api/chat/messages/${roomResponse.data.data._id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (messagesResponse.data.success) {
          setMessages(messagesResponse.data.data);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error opening chat');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/chat/message',
        { roomId: chatRoom._id, message: newMessage },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessages([...messages, response.data.data]);
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const markItemAsClaimed = async (itemId) => {
    const item = items.find(i => i._id === itemId);
    
    if (!user || !user.id) {
      alert('You must be logged in to mark items as resolved.');
      return;
    }
    
    if (!item) {
      alert('Item not found');
      return;
    }
    
    if (!isItemOwner(item)) {
      alert('Only the item owner can mark this as resolved.');
      return;
    }
    
    if (!window.confirm('Mark this item as resolved? This will notify the claimant.')) return;

    setClaimLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/items/${itemId}/mark-claimed`,
        { claimerId: user.id },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Item marked as resolved successfully!');
        fetchItems();
        // Close chat modal if open
        setShowChatModal(false);
      } else {
        alert(response.data.message || 'Failed to mark as resolved');
      }
    } catch (err) {
      console.error('Error marking item:', err);
      alert('Error marking item: ' + (err.response?.data?.message || err.message));
    } finally {
      setClaimLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: null });
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const itemData = {
        ...formData,
        category: reportMode
      };
      
      const response = await axios.post('http://localhost:5000/api/items', itemData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        alert('Item reported successfully!');
        setShowReportModal(false);
        resetForm();
        fetchItems();
      } else {
        alert(response.data.message || 'Failed to report item');
      }
    } catch (err) {
      alert('Error reporting item: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'lost',
      itemCategory: 'others',
      location: '',
      date: new Date().toISOString().split('T')[0],
      image: null
    });
    setImagePreview(null);
    setReportMode('lost');
  };

  const handleNotificationClick = (itemId) => {
    setScrollToItemId(itemId);
    setCategoryFilter('all');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="main-container">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome back, <span className="text-accent">{user?.name?.split(' ')[0] || 'User'}!</span>
              </h1>
              <p className="hero-description">
                Track lost and found items, report new findings, and help reunite people with their belongings.
              </p>
              <button className="hero-report-btn" onClick={() => setShowReportModal(true)}>
                + Report Lost or Found Item
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Items</span>
              </div>
              <div className="stat">
                <span className="stat-value">{stats.lost}</span>
                <span className="stat-label">Lost</span>
              </div>
              <div className="stat">
                <span className="stat-value">{stats.found}</span>
                <span className="stat-label">Found</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search items by name, description, or location..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-chips">
              <button 
                className={`chip ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All Items
              </button>
              <button 
                className={`chip chip-lost ${categoryFilter === 'lost' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('lost')}
              >
                Lost Items
              </button>
              <button 
                className={`chip chip-found ${categoryFilter === 'found' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('found')}
              >
                Found Items
              </button>
              
              <div className="chip">
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="documents">Documents</option>
                  <option value="accessories">Accessories</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
            
            <div className="results-info">
              Showing {filteredItems.length} of {items.length} items
            </div>
          </div>

          {/* Items Grid */}
          <div className="items-grid">
            {filteredItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No items found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button className="report-btn-empty" onClick={() => setShowReportModal(true)}>
                  + Report an Item
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const owner = isItemOwner(item);
                
                return (
                  <div key={item._id} id={`item-${item._id}`} className="item-card">
                    <div className={`item-image ${item.category === 'lost' ? 'bg-lost' : 'bg-found'}`}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="item-emoji">
                          {item.category === 'lost' ? '🔍' : '📦'}
                        </div>
                      )}
                      <div className={`item-badge ${item.category}`}>
                        {item.category === 'lost' ? 'LOST' : 'FOUND'}
                      </div>
                      {item.itemCategory && (
                        <div className="item-category-tag">
                          {item.itemCategory}
                        </div>
                      )}
                    </div>
                    
                    <div className="item-body">
                      <h3 className="item-title">{item.name}</h3>
                      
                      <div className="item-posted-by">
                        <span className="posted-by-label">Posted by:</span>
                        <span className="posted-by-name">
                          {item.userName || 'Anonymous'}
                        </span>
                        {item.userStudentId && (
                          <span className="posted-by-studentid">
                            ({item.userStudentId})
                          </span>
                        )}
                        {owner && (
                          <span className="owner-badge">(Your Item)</span>
                        )}
                      </div>
                      
                      <p className="item-description">{item.description}</p>
                      <div className="item-meta">
                        <span>📍 {item.location}</span>
                        <span>📅 {new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="item-footer">
                        <div className={`status-pill ${item.status}`}>
                          {item.status === 'claimed' ? 'Resolved' : item.status}
                        </div>
                        <div className="item-actions">
                          {/* OWNER - View Inquiries button (opens chat to reply) */}
                          {owner && item.status !== 'claimed' && (
                            <button 
                              className="btn-inquiries"
                              onClick={() => openChat(item)}
                            >
                              📬 View Inquiries
                            </button>
                          )}
                          
                          {/* OWNER - Mark as Resolved button */}
                          {owner && item.status !== 'claimed' && (
                            <button 
                              className="btn-resolve"
                              onClick={() => markItemAsClaimed(item._id)}
                              disabled={claimLoading}
                            >
                              ✓ Mark as Resolved
                            </button>
                          )}
                          
                          {/* NON-OWNER - Chat button */}
                          {!owner && item.status !== 'claimed' && (
                            <button 
                              className="btn-chat"
                              onClick={() => openChat(item)}
                            >
                              💬 Chat
                            </button>
                          )}
                          
                          {item.status === 'claimed' && (
                            <span className="claimed-badge">✓ Resolved</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2>Report an Item</h2>
              <p>Help someone find their lost item or report something you found</p>
              <button className="modal-close" onClick={() => setShowReportModal(false)}>×</button>
            </div>
            
            <div className="mode-toggle">
              <button 
                className={`mode-btn ${reportMode === 'lost' ? 'active lost' : ''}`}
                onClick={() => setReportMode('lost')}
              >
                🔍 Lost Item
              </button>
              <button 
                className={`mode-btn ${reportMode === 'found' ? 'active found' : ''}`}
                onClick={() => setReportMode('found')}
              >
                📦 Found Item
              </button>
            </div>
            
            <form onSubmit={handleSubmitReport}>
              <input
                type="text"
                name="name"
                placeholder="Item name* (e.g., iPhone 13, Wallet, Keys)"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
              <textarea
                name="description"
                placeholder="Description* (e.g., Black leather wallet with ID cards, Silver iPhone with blue case)"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              
              <div className="form-row-2">
                <select name="itemCategory" value={formData.itemCategory} onChange={handleInputChange}>
                  <option value="electronics">📱 Electronics</option>
                  <option value="clothing">👕 Clothing</option>
                  <option value="documents">📄 Documents</option>
                  <option value="accessories">⌚ Accessories</option>
                  <option value="bag">🎒 Bags</option>
                  <option value="jewelry">💍 Jewelry</option>
                  <option value="keys">🔑 Keys</option>
                  <option value="wallet">👛 Wallet/Purse</option>
                  <option value="phone">📱 Phone</option>
                  <option value="laptop">💻 Laptop</option>
                  <option value="books">📚 Books</option>
                  <option value="others">📦 Others</option>
                </select>
                
                <input
                  type="text"
                  name="location"
                  placeholder="Location* (e.g., Library, Cafeteria, Room 201)"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              
              <div className="image-upload-area">
                {!imagePreview ? (
                  <div className="upload-zone" onClick={() => document.getElementById('imageInput').click()}>
                    <p>📸 Click to upload image</p>
                    <span>PNG, JPG up to 5MB (Optional but recommended)</span>
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" onClick={removeImage}>×</button>
                  </div>
                )}
              </div>
              
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : `Submit ${reportMode === 'lost' ? 'Lost' : 'Found'} Item`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal - Both owner and non-owner can use this */}
      <ChatModal 
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        item={selectedItem}
        currentUser={user}
        onItemUpdate={fetchItems}
      />
    </div>
  );
};

export default Dashboard;