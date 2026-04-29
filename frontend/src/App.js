import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfileScreen from './components/ProfileScreen';
import MainLayout from './components/MainLayout';
import './App.css';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }
    
    if (!user) return <Navigate to="/login" replace />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
    
    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
    return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
    const [chatNotificationHandler, setChatNotificationHandler] = useState(null);

    const registerChatHandler = useCallback((handler) => {
        setChatNotificationHandler(() => handler);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <MainLayout onOpenChatFromNotification={chatNotificationHandler}>
                            <Dashboard registerChatHandler={registerChatHandler} />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <ProfileScreen />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <MainLayout>
                            <AdminDashboard />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Router>
    );
}

export default App;