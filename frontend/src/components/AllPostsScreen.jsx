import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://lostandfound-ipt-1.onrender.com';

const styles = `
  .all-posts-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
  }

  .page-header {
    background: #0B3A66;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
  }

  .header-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .back-button {
    padding: 8px 16px;
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .back-button:hover {
    background: rgba(255,255,255,0.08);
    color: #FFFFFF;
    border-color: rgba(255,255,255,0.3);
  }

  .page-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    margin: 0;
  }

  .post-count-badge {
    padding: 6px 14px;
    background: rgba(255,255,255,0.15);
    color: #F4B400;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .page-main {
    padding: 32px 0 60px;
  }

  .main-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .filters-section {
    background: #FFFFFF;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 2px 12px rgba(11, 58, 102, 0.06);
    border: 1px solid rgba(11, 58, 102, 0.08);
  }

  .search-container { margin-bottom: 20px; }

  .search-field {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #E8DFD0;
    border-radius: 14px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    background: #FAF8F4;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .search-field:focus {
    outline: none;
    border-color: #0B3A66;
    background: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(11, 58, 102, 0.06);
  }

  .search-field::placeholder { color: #B8A88A; }

  .filter-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .filter-tab {
    padding: 10px 20px;
    background: transparent;
    color: #5C4F3A;
    border: 1px solid #E0D5C0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .filter-tab:hover { background: #F5E6C8; border-color: #D4C4A8; }
  .filter-tab.active { background: #0B3A66; color: #FFFFFF; border-color: #0B3A66; }

  .status-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #E8DFD0;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    background: #FAF8F4;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #5C4F3A;
    box-sizing: border-box;
  }

  .status-select:focus { outline: none; border-color: #0B3A66; background: #FFFFFF; }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
  }

  .post-card {
    background: #FFFFFF;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #E8DFD0;
    box-shadow: 0 2px 8px rgba(11, 58, 102, 0.04);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(11, 58, 102, 0.1);
    border-color: #D4C4A8;
  }

  .post-header {
    padding: 20px 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .post-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #0B3A66;
    margin: 0;
    flex: 1;
  }

  .post-category {
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .post-category.lost { background: rgba(192, 57, 43, 0.9); color: #FFFFFF; }
  .post-category.found { background: rgba(31, 107, 79, 0.9); color: #FFFFFF; }

  .post-description {
    padding: 0 20px;
    color: #6B5E4A;
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .post-details {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid #F0E8D8;
    border-bottom: 1px solid #F0E8D8;
    background: #FAF8F4;
  }

  .detail-row { display: flex; justify-content: space-between; font-size: 13px; }
  .detail-label { color: #8E8068; font-weight: 500; }
  .detail-value { color: #0B3A66; font-weight: 600; }

  .post-footer {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-status {
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
  }

  .post-status.pending { background: #FEF3C7; color: #B45309; }
  .post-status.claimed { background: #DBEAFE; color: #1D4ED8; }
  .post-status.verified { background: #D1FAE5; color: #065F46; }
  .post-status.ready_for_pickup { background: #EDE9FE; color: #6D28D9; }

  .claim-btn {
    padding: 7px 20px;
    background: #0B3A66;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .claim-btn:hover { background: #0F4C80; transform: translateY(-1px); }

  .loading-container {
    text-align: center;
    padding: 80px 20px;
    background: #FFFFFF;
    border-radius: 18px;
    border: 1px solid #E8DFD0;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #E8DFD0;
    border-top-color: #0B3A66;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-container p { color: #8E8068; font-size: 15px; }

  .empty-container {
    background: #FFFFFF;
    border-radius: 18px;
    padding: 80px 40px;
    text-align: center;
    border: 1px solid #E8DFD0;
  }

  .empty-content { max-width: 400px; margin: 0 auto; }
  .empty-icon { font-size: 56px; margin-bottom: 16px; }
  .empty-content h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #0B3A66; margin-bottom: 8px; }
  .empty-content p { color: #8E8068; margin-bottom: 20px; }

  .clear-filters-btn {
    padding: 12px 24px;
    background: #FFFFFF;
    color: #5C4F3A;
    border: 1px solid #D4C4A8;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .clear-filters-btn:hover { background: #F5E6C8; border-color: #C4A87A; }

  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(11, 58, 102, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    backdrop-filter: blur(6px);
  }

  .modal-content {
    background: #FFFFFF;
    border-radius: 24px;
    width: 100%;
    max-width: 550px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 40px rgba(11, 58, 102, 0.15);
  }

  .modal-close {
    position: absolute;
    top: 20px; right: 20px;
    background: #F5E6C8;
    border: none;
    width: 32px; height: 32px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5C4F3A;
    transition: all 0.2s ease;
  }

  .modal-close:hover { background: #E8D5B0; color: #0B3A66; }

  .modal-header { padding: 30px 30px 20px; border-bottom: 1px solid #F0E8D8; }

  .modal-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #0B3A66;
    margin: 0 0 12px;
  }

  .modal-category {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .modal-category.lost { background: #C0392B; color: #FFFFFF; }
  .modal-category.found { background: #1F6B4F; color: #FFFFFF; }

  .modal-body { padding: 24px 30px; }

  .modal-description { color: #6B5E4A; font-size: 15px; line-height: 1.7; margin-bottom: 24px; }

  .modal-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #FAF8F4;
    padding: 20px;
    border-radius: 12px;
  }

  .detail-item { display: flex; flex-direction: column; gap: 4px; }
  .detail-item .detail-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #8E8068; }
  .detail-item .detail-value { font-size: 15px; font-weight: 600; color: #0B3A66; }
  .detail-item .detail-sub { font-size: 13px; color: #8E8068; }

  .modal-footer {
    padding: 20px 30px 30px;
    display: flex;
    gap: 12px;
    border-top: 1px solid #F0E8D8;
  }

  .modal-claim-btn {
    flex: 1;
    padding: 14px;
    background: #0B3A66;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .modal-claim-btn:hover:not(:disabled) {
    background: #0F4C80;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(11, 58, 102, 0.2);
  }

  .modal-claim-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .modal-close-btn {
    flex: 1;
    padding: 14px;
    background: #FFFFFF;
    color: #5C4F3A;
    border: 1px solid #D4C4A8;
    border-radius: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .modal-close-btn:hover { background: #F5E6C8; border-color: #C4A87A; }

  @media (max-width: 768px) {
    .header-container { flex-direction: column; gap: 16px; }
    .header-left { flex-direction: column; gap: 16px; width: 100%; }
    .back-button { width: 100%; }
    .filter-tabs { flex-direction: column; }
    .filter-tab { width: 100%; }
    .posts-grid { grid-template-columns: 1fr; }
    .modal-footer { flex-direction: column; }
  }
`;

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

  useEffect(() => { fetchItems(); }, []);

  useEffect(() => { filterItems(); }, [items, searchTerm, categoryFilter, statusFilter]);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/items', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) setItems(response.data.data);
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
    if (categoryFilter !== 'all') filtered = filtered.filter(item => item.category === categoryFilter);
    if (statusFilter !== 'all') filtered = filtered.filter(item => item.status === statusFilter);
    setFilteredItems(filtered);
  };

  const handleClaim = async (itemId) => {
    setClaiming(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/claims/${itemId}`, {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.data.success) {
        alert('Item claimed successfully!');
        fetchItems();
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
      <>
        <style>{styles}</style>
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
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="all-posts-page">
        <header className="page-header">
          <div className="header-container">
            <div className="header-left">
              <button onClick={() => window.history.back()} className="back-button">← Back</button>
              <h1 className="page-title">All Posts</h1>
              <span className="post-count-badge">{filteredItems.length} posts</span>
            </div>
          </div>
        </header>

        <main className="page-main">
          <div className="main-container">
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
                <button className={`filter-tab ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All</button>
                <button className={`filter-tab ${categoryFilter === 'lost' ? 'active' : ''}`} onClick={() => setCategoryFilter('lost')}>Lost Items</button>
                <button className={`filter-tab ${categoryFilter === 'found' ? 'active' : ''}`} onClick={() => setCategoryFilter('found')}>Found Items</button>
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-select">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="claimed">Claimed</option>
                <option value="verified">Verified</option>
              </select>
            </div>

            {filteredItems.length === 0 ? (
              <div className="empty-container">
                <div className="empty-content">
                  <div className="empty-icon"></div>
                  <h3>No posts found</h3>
                  <p>Try adjusting your search or filter to find what you're looking for.</p>
                  <button onClick={clearFilters} className="clear-filters-btn">Clear Filters</button>
                </div>
              </div>
            ) : (
              <div className="posts-grid">
                {filteredItems.map((item) => (
                  <div key={item._id} className="post-card" onClick={() => { setSelectedItem(item); setShowModal(true); }}>
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
                        <span className="detail-value">{new Date(item.date).toLocaleDateString()}</span>
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
                        <button className="claim-btn" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setShowModal(true); }}>
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
                    <span className="detail-value">{new Date(selectedItem.date).toLocaleDateString()}</span>
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
                  <button className="modal-claim-btn" onClick={() => handleClaim(selectedItem._id)} disabled={claiming}>
                    {claiming ? 'Processing...' : 'Claim This Item'}
                  </button>
                ) : (
                  <button className="modal-claim-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    Already Claimed
                  </button>
                )}
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllPostsScreen;
