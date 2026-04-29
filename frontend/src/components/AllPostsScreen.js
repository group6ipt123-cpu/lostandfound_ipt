import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllPostsScreen.css';

const AllPostsScreen = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, categoryFilter, statusFilter]);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        console.error('Failed to fetch items:', response.data.message);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...items];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category (lost/found)
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    setFilteredItems(filtered);
  };

  const handleClaim = async (itemId) => {
    setClaiming(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/claims/${itemId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        alert('Item claimed successfully!');
        fetchItems(); // Refresh the list
        setShowModal(false);
      } else {
        alert(response.data.message || 'Failed to claim item');
      }
    } catch (err) {
      alert('Error claiming item: ' + (err.response?.data?.message || err.message));
    } finally {
      setClaiming(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'claimed': return 'claimed';
      case 'pending': return 'pending';
      case 'verified': return 'verified';
      case 'ready_for_pickup': return 'ready_for_pickup';
      default: return 'pending';
    }
  };

  if (loading) {
    return (
      <div className="all-posts-page">
        <div className="page-main">
          <div className="main-container">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-posts-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-container">
          <div className="header-left">
            <button onClick={() => window.history.back()} className="back-button">
              ← Back
            </button>
            <h1 className="page-title">All Posts</h1>
            <span className="post-count-badge">{filteredItems.length} posts</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-main">
        <div className="main-container">
          {/* Filters Section */}
          <div className="filters-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-field"
              />
            </div>
            
            <div className="filter-tabs">
              <button
                className={`filter-tab ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-tab ${categoryFilter === 'lost' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('lost')}
              >
                Lost Items
              </button>
              <button
                className={`filter-tab ${categoryFilter === 'found' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('found')}
              >
                Found Items
              </button>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="claimed">Claimed</option>
              <option value="verified">Verified</option>
            </select>
          </div>

          {/* Posts Grid */}
          {filteredItems.length === 0 ? (
            <div className="empty-container">
              <div className="empty-content">
                <div className="empty-icon"></div>
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="post-card"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}
                >
                  <div className="post-header">
                    <h3 className="post-title">{item.name}</h3>
                    <div className={`post-category ${item.category}`}>
                      {item.category === 'lost' ? 'LOST' : 'FOUND'}
                    </div>
                  </div>
                  <p className="post-description">{item.description}</p>
                  <div className="post-details">
                    <div className="detail-row">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{item.location}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    {item.itemCategory && (
                      <div className="detail-row">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{item.itemCategory}</span>
                      </div>
                    )}
                  </div>
                  <div className="post-footer">
                    <div className={`post-status ${getStatusBadgeClass(item.status)}`}>
                      {item.status.toUpperCase()}
                    </div>
                    {item.status !== 'claimed' && (
                      <button
                        className="claim-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                          setShowModal(true);
                        }}
                      >
                        Claim Item
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal for item details */}
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            
            <div className="modal-header">
              <h2 className="modal-title">{selectedItem.name}</h2>
              <div className={`modal-category ${selectedItem.category}`}>
                {selectedItem.category === 'lost' ? 'LOST ITEM' : 'FOUND ITEM'}
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedItem.description}</p>
              
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{selectedItem.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">
                    {new Date(selectedItem.date).toLocaleDateString()}
                  </span>
                </div>
                {selectedItem.itemCategory && (
                  <div className="detail-item">
                    <span className="detail-label">Item Type</span>
                    <span className="detail-value">{selectedItem.itemCategory}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value">{selectedItem.status.toUpperCase()}</span>
                  <span className="detail-sub">
                    {selectedItem.status === 'claimed' 
                      ? 'This item has already been claimed' 
                      : 'You can claim this item if it belongs to you'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              {selectedItem.status !== 'claimed' ? (
                <button
                  className="modal-claim-btn"
                  onClick={() => handleClaim(selectedItem._id)}
                  disabled={claiming}
                >
                  {claiming ? 'Processing...' : 'Claim This Item'}
                </button>
              ) : (
                <button
                  className="modal-claim-btn"
                  disabled
                  style={{ opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Already Claimed
                </button>
              )}
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPostsScreen;