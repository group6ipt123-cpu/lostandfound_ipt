import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatModal from './ChatModal';
import MessageList from './MessageList';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://lostandfound-ipt-1.onrender.com';
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: #F5E6C8;
    color: #0B3A66;
    -webkit-font-smoothing: antialiased;
  }

  .dashboard {
    min-height: 100vh;
    background: linear-gradient(180deg, #F5E6C8 0%, #FAF3E0 100%);
  }

  .dashboard-header {
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

  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .logo-image { width: 38px; height: 38px; border-radius: 10px; object-fit: cover; }

  .logo {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.5px;
  }

  .logo span { color: #F4B400; }

  .header-nav { display: flex; align-items: center; gap: 4px; }

  .nav-link {
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .nav-link:hover { background: rgba(255,255,255,0.08); color: #FFFFFF; }
  .nav-link.active { background: rgba(255,255,255,0.12); color: #FFFFFF; }

  .header-right { display: flex; align-items: center; gap: 10px; }

  .ghost-btn {
    padding: 8px 16px;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .ghost-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); }

  .primary-btn {
    padding: 8px 18px;
    border: none;
    background: #F4B400;
    color: #0B3A66;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 2px 8px rgba(244, 180, 0, 0.25);
  }

  .primary-btn:hover {
    background: #E5A800;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(244, 180, 0, 0.35);
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px 6px 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .user-profile:hover { background: rgba(255,255,255,0.15); transform: translateY(-1px); }

  .user-avatar {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #F4B400, #C89B2B);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0B3A66;
    font-weight: 700;
    font-size: 16px;
  }

  .user-info { display: flex; flex-direction: column; gap: 2px; }
  .user-name { font-size: 14px; font-weight: 600; color: #FFFFFF; }
  .user-role { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.7); }

  .logout-btn {
    padding: 6px 12px;
    border: none;
    background: #C0392B;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .logout-btn:hover { background: #A93226; transform: translateY(-1px); }

  /* ── Main ── */
  .dashboard-main { padding: 32px 0 60px; }

  .main-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  /* ── Hero ── */
  .hero-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin-bottom: 40px;
    padding: 40px;
    background: linear-gradient(135deg, #0B3A66 0%, #0F4C80 100%);
    border-radius: 24px;
    overflow: hidden;
    position: relative;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(244,180,0,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-content { position: relative; z-index: 1; flex: 1; }

  .hero-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: -1px;
  }

  .text-accent   { color: #F4B400; }
  .text-secondary { color: #2ECC71; }

  .hero-description {
    font-size: 16px;
    color: rgba(255,255,255,0.75);
    max-width: 500px;
    line-height: 1.6;
  }

  .hero-report-btn {
    margin-top: 20px;
    padding: 12px 28px;
    background: linear-gradient(135deg, #F4B400 0%, #E5A800 100%);
    color: #0B3A66;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3);
  }

  .hero-report-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(244, 180, 0, 0.4); }

  .hero-stats { position: relative; z-index: 1; display: flex; gap: 32px; }

  .hero-stats .stat {
    text-align: center;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    padding: 20px 28px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .stat-value {
    display: block;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #F4B400;
  }

  .stat-label { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 4px; display: block; }

  /* ── Search ── */
  .search-section {
    background: #FFFFFF;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 2px 12px rgba(11, 58, 102, 0.06);
    border: 1px solid rgba(11, 58, 102, 0.08);
  }

  .search-bar { margin-bottom: 16px; }

  .search-input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #E8DFD0;
    border-radius: 14px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    background: #FAF8F4;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #0B3A66;
    background: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(11, 58, 102, 0.06);
  }

  .search-input::placeholder { color: #B8A88A; }

  .filter-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }

  .chip {
    padding: 8px 16px;
    border: 1px solid #E0D5C0;
    background: #FFFFFF;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    color: #5C4F3A;
  }

  .chip:hover { background: #F5E6C8; border-color: #D4C4A8; }
  .chip.active { background: #0B3A66; color: #FFFFFF; border-color: #0B3A66; }
  .chip.chip-lost.active  { background: #C0392B; border-color: #C0392B; }
  .chip.chip-found.active { background: #1F6B4F; border-color: #1F6B4F; }

  .chip select {
    border: none;
    background: transparent;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    cursor: pointer;
    color: inherit;
    outline: none;
  }

  .results-info { font-size: 13px; color: #8E8068; font-weight: 500; }

  /* ── Items Grid ── */
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .item-card {
    background: #FFFFFF;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #E8DFD0;
    box-shadow: 0 2px 8px rgba(11, 58, 102, 0.04);
    transition: all 0.3s ease;
  }

  .item-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(11, 58, 102, 0.1);
    border-color: #D4C4A8;
  }

  .item-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-image.bg-lost  { background: linear-gradient(135deg, #FDE8E8 0%, #FBD5D5 100%); }
  .item-image.bg-found { background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%); }
  .item-image img { width: 100%; height: 100%; object-fit: cover; }

  .item-emoji {
    font-size: 64px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    transition: all 0.3s ease;
  }

  .item-card:hover .item-emoji { transform: scale(1.1) rotate(3deg); }

  .item-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #FFFFFF;
    backdrop-filter: blur(4px);
  }

  .item-badge.lost  { background: rgba(192, 57, 43, 0.9); }
  .item-badge.found { background: rgba(31, 107, 79, 0.9); }

  .item-category-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(255,255,255,0.85);
    color: #0B3A66;
    backdrop-filter: blur(4px);
  }

  .item-body { padding: 18px; }

  .item-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #0B3A66;
    margin-bottom: 6px;
  }

  .item-posted-by {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 12px;
    padding: 8px 12px;
    background: linear-gradient(135deg, #F5F5F5 0%, #FAFAFA 100%);
    border-radius: 10px;
    border-left: 3px solid #F4B400;
    font-size: 12px;
  }

  .posted-by-label {
    color: #8E8068;
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .posted-by-name   { color: #0B3A66; font-weight: 700; font-size: 13px; }
  .posted-by-studentid { color: #8E8068; font-size: 11px; background: #F0E8D8; padding: 2px 6px; border-radius: 12px; }

  .item-description { font-size: 13px; color: #6B5E4A; line-height: 1.5; margin-bottom: 14px; }

  .item-meta {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #8E8068;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #F0E8D8;
  }

  .status-pill { padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 600; }
  .status-pill.pending          { background: #FEF3C7; color: #B45309; }
  .status-pill.claimed          { background: #DBEAFE; color: #1D4ED8; }
  .status-pill.verified         { background: #D1FAE5; color: #065F46; }
  .status-pill.ready_for_pickup { background: #EDE9FE; color: #6D28D9; }

  .item-actions { display: flex; gap: 6px; flex-wrap: wrap; }

  .owner-badge {
    background: #F4B400;
    color: #0B3A66;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 700;
    margin-left: 8px;
  }

  .claimed-badge {
    padding: 5px 12px;
    background: #E8DFD0;
    color: #8E8068;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
  }

  .btn-resolve {
    padding: 7px 14px;
    background: #2ECC71;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .btn-resolve:hover    { background: #27AE60; transform: translateY(-1px); }
  .btn-resolve:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-chat {
    padding: 7px 14px;
    background: #0084FF;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .btn-chat:hover { background: #0073E6; transform: translateY(-1px); }

  .btn-inquiries {
    padding: 7px 14px;
    background: #F4B400;
    color: #0B3A66;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .btn-inquiries:hover { background: #E5A800; transform: translateY(-1px); }

  /* ── Modal ── */
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

  .dialog-modal {
    background: #FFFFFF;
    border-radius: 24px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(11, 58, 102, 0.15);
  }

  .dialog-header { padding: 28px 28px 0; position: relative; }

  .dialog-header h2 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #0B3A66;
    margin-bottom: 6px;
  }

  .dialog-header p { color: #8E8068; font-size: 14px; }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #F5E6C8;
    border: none;
    width: 32px;
    height: 32px;
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

  .mode-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 20px 28px;
    background: #FAF8F4;
    margin: 16px 0;
  }

  .mode-btn {
    padding: 12px;
    border: 2px solid #E8DFD0;
    background: #FFFFFF;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    color: #8E8068;
  }

  .mode-btn:hover { border-color: #C4A87A; }
  .mode-btn.active.lost  { background: #C0392B; color: #FFFFFF; border-color: #C0392B; }
  .mode-btn.active.found { background: #1F6B4F; color: #FFFFFF; border-color: #1F6B4F; }

  .dialog-modal form { padding: 0 28px 28px; }

  .dialog-modal input,
  .dialog-modal select,
  .dialog-modal textarea {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #E8DFD0;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    margin-bottom: 12px;
    background: #FAF8F4;
    transition: all 0.2s ease;
  }

  .dialog-modal input:focus,
  .dialog-modal select:focus,
  .dialog-modal textarea:focus {
    outline: none;
    border-color: #0B3A66;
    background: #FFFFFF;
  }

  .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .image-upload-area { margin-bottom: 16px; }

  .upload-zone {
    border: 2px dashed #D4C4A8;
    border-radius: 14px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .upload-zone:hover { border-color: #0B3A66; background: #FAF8F4; }
  .upload-zone p   { font-weight: 500; color: #5C4F3A; }
  .upload-zone span { font-size: 12px; color: #B8A88A; }

  .preview { position: relative; border-radius: 14px; overflow: hidden; }
  .preview img { width: 100%; height: 200px; object-fit: cover; }

  .preview button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #C0392B;
    color: #FFFFFF;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #0B3A66;
    color: #FFFFFF;
    border: none;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
    margin-top: 8px;
  }

  .submit-btn:hover { background: #0F4C80; transform: translateY(-1px); }

  /* ── States ── */
  .loading-state { text-align: center; padding: 60px; }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #E8DFD0;
    border-top-color: #0B3A66;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .empty-state { text-align: center; padding: 80px 20px; }
  .empty-icon  { font-size: 56px; margin-bottom: 16px; }
  .empty-state h3 { font-weight: 700; color: #0B3A66; margin-bottom: 8px; }
  .empty-state p  { color: #8E8068; margin-bottom: 20px; }

  .report-btn-empty {
    margin-top: 20px;
    padding: 10px 24px;
    background: #0B3A66;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }

  .report-btn-empty:hover { background: #0F4C80; transform: translateY(-2px); }

  /* ── Highlight animation ── */
  @keyframes highlightPulse {
    0%   { box-shadow: 0 0 0 0 rgba(244, 180, 0, 0.7); border-color: #F4B400; }
    70%  { box-shadow: 0 0 0 10px rgba(244, 180, 0, 0); border-color: #F4B400; }
    100% { box-shadow: 0 0 0 0 rgba(244, 180, 0, 0); border-color: #E8DFD0; }
  }

  .highlight-item {
    animation: highlightPulse 1s ease-in-out 3;
    background: #FFF9E6 !important;
    border-color: #F4B400 !important;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .header-container { flex-direction: column; gap: 12px; }
    .hero-section     { flex-direction: column; padding: 28px; text-align: center; }
    .hero-title       { font-size: 30px; }
    .hero-stats       { justify-content: center; }
    .items-grid       { grid-template-columns: 1fr; }
    .form-row-2       { grid-template-columns: 1fr; }
    .user-info        { display: none; }
    .user-profile     { padding: 6px; }

    .item-actions { flex-direction: column; width: 100%; }
    .item-actions button,
    .item-actions .claimed-badge { width: 100%; text-align: center; }
  }
`;

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
  const [showMessageList, setShowMessageList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [claimLoading, setClaimLoading] = useState(false);
  const [scrollToItemId, setScrollToItemId] = useState(null);

  const [formData, setFormData] = useState({
    name: '', description: '', category: 'lost', itemCategory: 'others',
    location: '', date: new Date().toISOString().split('T')[0], image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const cleanId = (id) => (!id ? '' : String(id).replace(/ObjectId\("|"\)/g, '').trim());

  const isItemOwner = (item) => {
    if (!user || !user.id || !item || !item.userId) return false;
    return cleanId(user.id) === cleanId(item.userId);
  };

  const openChatFromNotification = React.useCallback(async (itemId, senderId) => {
    let item = items.find(i => i._id === itemId);
    if (!item) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/items/${itemId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.success) item = response.data.data;
        else return;
      } catch (err) { return; }
    }
    setSelectedItem(item);
    setSelectedRoom(null);
    setShowChatModal(true);
  }, [items]);

  useEffect(() => {
    if (registerChatHandler) registerChatHandler(openChatFromNotification);
  }, [registerChatHandler, openChatFromNotification]);

const fetchUser = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        setUser({ ...parsed, id: parsed.id || parsed._id });
      }
    } catch (err) { console.error('Error fetching user:', err); }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/items', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setItems(response.data.data);
        setStats({
          total: response.data.data.length,
          lost:  response.data.data.filter(i => i.category === 'lost').length,
          found: response.data.data.filter(i => i.category === 'found').length
        });
      }
    } catch (err) { console.error('Error fetching items:', err); }
    finally { setLoading(false); }
  };

  const filterItems = React.useCallback(() => {
    let filtered = [...items];
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'all') filtered = filtered.filter(item => item.category === categoryFilter);
    if (typeFilter !== 'all') filtered = filtered.filter(item => item.itemCategory === typeFilter);
    setFilteredItems(filtered);
  }, [items, searchTerm, categoryFilter, typeFilter]);

  useEffect(() => { fetchUser(); fetchItems(); }, []);
  useEffect(() => { filterItems(); }, [filterItems]);

  useEffect(() => {
    if (scrollToItemId && filteredItems.length > 0) {
      const element = document.getElementById(`item-${scrollToItemId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-item');
        setTimeout(() => element.classList.remove('highlight-item'), 3000);
      }
      setScrollToItemId(null);
    }
  }, [filteredItems, scrollToItemId]);

  const openChat = (item) => { setSelectedItem(item); setSelectedRoom(null); setShowChatModal(true); };

  const handleViewMessages = (item) => { setSelectedItem(item); setShowMessageList(true); };

  const handleSelectChat = (room) => {
    setShowMessageList(false);
    const item = items.find(i => i._id === room.itemId || i._id === room.item?._id);
    setSelectedItem(item);
    setSelectedRoom(room);
    setShowChatModal(true);
  };

  const markItemAsClaimed = async (itemId) => {
    const item = items.find(i => i._id === itemId);
    if (!user || !user.id)   { alert('You must be logged in.'); return; }
    if (!item)               { alert('Item not found'); return; }
    if (!isItemOwner(item))  { alert('Only the item owner can mark this as resolved.'); return; }
    if (!window.confirm('Mark this item as resolved?')) return;
    setClaimLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/items/${itemId}/mark-claimed`,
        { claimerId: user.id },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.data.success) { alert('Item marked as resolved!'); fetchItems(); setShowChatModal(false); }
      else { alert(response.data.message || 'Failed'); }
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
    finally { setClaimLoading(false); }
  };

  const handleInputChange  = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); setFormData({ ...formData, image: reader.result }); };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => { setImagePreview(null); setFormData({ ...formData, image: null }); };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/items',
        { ...formData, category: reportMode },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.data.success) { alert('Item reported!'); setShowReportModal(false); resetForm(); fetchItems(); }
      else { alert(response.data.message || 'Failed'); }
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
    finally { setSubmitting(false); }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', category: 'lost', itemCategory: 'others', location: '', date: new Date().toISOString().split('T')[0], image: null });
    setImagePreview(null);
    setReportMode('lost');
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="dashboard">
          <div className="loading-state"><div className="spinner" /><p>Loading dashboard...</p></div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        <main className="dashboard-main">
          <div className="main-container">

            {/* Hero */}
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
                <div className="stat"><span className="stat-value">{stats.total}</span><span className="stat-label">Total Items</span></div>
                <div className="stat"><span className="stat-value">{stats.lost}</span><span className="stat-label">Lost</span></div>
                <div className="stat"><span className="stat-value">{stats.found}</span><span className="stat-label">Found</span></div>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="search-section">
              <div className="search-bar">
                <input type="text" placeholder="Search items..." className="search-input"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="filter-chips">
                <button className={`chip ${categoryFilter === 'all'   ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All Items</button>
                <button className={`chip chip-lost  ${categoryFilter === 'lost'  ? 'active' : ''}`} onClick={() => setCategoryFilter('lost')}>Lost Items</button>
                <button className={`chip chip-found ${categoryFilter === 'found' ? 'active' : ''}`} onClick={() => setCategoryFilter('found')}>Found Items</button>
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
              <div className="results-info">Showing {filteredItems.length} of {items.length} items</div>
            </div>

            {/* Items Grid */}
            <div className="items-grid">
              {filteredItems.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <h3>No items found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                  <button className="report-btn-empty" onClick={() => setShowReportModal(true)}>+ Report an Item</button>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const owner = isItemOwner(item);
                  return (
                    <div key={item._id} id={`item-${item._id}`} className="item-card">
                      <div className={`item-image ${item.category === 'lost' ? 'bg-lost' : 'bg-found'}`}>
                        {item.image
                          ? <img src={item.image} alt={item.name} />
                          : <div className="item-emoji">{item.category === 'lost' ? '🔍' : '📦'}</div>}
                        <div className={`item-badge ${item.category}`}>{item.category === 'lost' ? 'LOST' : 'FOUND'}</div>
                        {item.itemCategory && <div className="item-category-tag">{item.itemCategory}</div>}
                      </div>
                      <div className="item-body">
                        <h3 className="item-title">{item.name}</h3>
                        <div className="item-posted-by">
                          <span className="posted-by-label">Posted by:</span>
                          <span className="posted-by-name">{item.userName || 'Anonymous'}</span>
                          {item.userStudentId && <span className="posted-by-studentid">({item.userStudentId})</span>}
                          {owner && <span className="owner-badge">(Your Item)</span>}
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
                            {owner && item.status !== 'claimed' && (
                              <button className="btn-inquiries" onClick={() => handleViewMessages(item)}>View Messages</button>
                            )}
                            {owner && item.status !== 'claimed' && (
                              <button className="btn-resolve" onClick={() => markItemAsClaimed(item._id)} disabled={claimLoading}>Mark Resolved</button>
                            )}
                            {!owner && item.category === 'lost' && item.status !== 'claimed' && (
                              <button className="btn-chat" onClick={() => openChat(item)}>I found this</button>
                            )}
                            {!owner && item.category === 'found' && item.status !== 'claimed' && (
                              <button className="btn-chat" onClick={() => openChat(item)}>This is mine</button>
                            )}
                            {item.status === 'claimed' && <span className="claimed-badge">Resolved</span>}
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
                <button className="modal-close" onClick={() => setShowReportModal(false)}>✕</button>
              </div>
              <div className="mode-toggle">
                <button className={`mode-btn ${reportMode === 'lost'  ? 'active lost'  : ''}`} onClick={() => setReportMode('lost')}>Lost Item</button>
                <button className={`mode-btn ${reportMode === 'found' ? 'active found' : ''}`} onClick={() => setReportMode('found')}>Found Item</button>
              </div>
              <form onSubmit={handleSubmitReport}>
                <input type="text" name="name" placeholder="Item name*" value={formData.name} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description*" rows="3" value={formData.description} onChange={handleInputChange} required />
                <div className="form-row-2">
                  <select name="itemCategory" value={formData.itemCategory} onChange={handleInputChange}>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="documents">Documents</option>
                    <option value="accessories">Accessories</option>
                    <option value="bag">Bags</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="keys">Keys</option>
                    <option value="wallet">Wallet/Purse</option>
                    <option value="phone">Phone</option>
                    <option value="laptop">Laptop</option>
                    <option value="books">Books</option>
                    <option value="others">Others</option>
                  </select>
                  <input type="text" name="location" placeholder="Location*" value={formData.location} onChange={handleInputChange} required />
                </div>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                <div className="image-upload-area">
                  {!imagePreview ? (
                    <div className="upload-zone" onClick={() => document.getElementById('imageInput').click()}>
                      <p>Click to upload image</p>
                      <span>PNG, JPG up to 5MB</span>
                      <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                  ) : (
                    <div className="preview">
                      <img src={imagePreview} alt="Preview" />
                      <button type="button" onClick={removeImage}>✕</button>
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

        {showMessageList && selectedItem && (
          <MessageList
            item={selectedItem}
            onSelectChat={handleSelectChat}
            onClose={() => setShowMessageList(false)}
          />
        )}

        <ChatModal
          isOpen={showChatModal}
          onClose={() => { setShowChatModal(false); setSelectedRoom(null); }}
          item={selectedItem}
          currentUser={user}
          onItemUpdate={fetchItems}
          initialRoom={selectedRoom}
        />
      </div>
    </>
  );
};

export default Dashboard;
