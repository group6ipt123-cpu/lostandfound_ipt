import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        contactNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Email validation function
    const validateEmail = (email) => {
        const neuEmailRegex = /^[a-zA-Z0-9._%+-]+@neu\.edu\.ph$/;
        return neuEmailRegex.test(email);
    };

    // Student ID validation function (format: 22-12975-964)
    const validateStudentId = (studentId) => {
        const studentIdRegex = /^\d{2}-\d{5}-\d{3}$/;
        return studentIdRegex.test(studentId);
    };

    // Phone number validation (Philippine format)
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^(09|\+639)\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleChange = (e) => {
        let value = e.target.value;
        
        // Auto-format student ID as user types
        if (e.target.name === 'studentId') {
            // Remove non-digits
            let digits = value.replace(/\D/g, '');
            
            // Format as XX-XXXXX-XXX
            if (digits.length > 2) {
                value = digits.slice(0, 2) + '-' + digits.slice(2);
            }
            if (digits.length > 7) {
                value = value.slice(0, 8) + '-' + value.slice(8, 11);
            }
            if (digits.length > 11) {
                value = value.slice(0, 13);
            }
        }
        
        setFormData({ ...formData, [e.target.name]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.studentId || 
            !formData.contactNumber || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        // Validate email domain
        if (!validateEmail(formData.email)) {
            setError('Please use your @neu.edu.ph email address');
            return;
        }

        // Validate student ID format
        if (!validateStudentId(formData.studentId)) {
            setError('Student ID must be in format: XX-XXXXX-XXX (e.g., 22-12975-964)');
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(formData.contactNumber)) {
            setError('Please enter a valid Philippine mobile number (e.g., 09123456789 or +639123456789)');
            return;
        }

        // Validate password
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            studentId: formData.studentId,
            contactNumber: formData.contactNumber
        });
        
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message || 'Registration failed');
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <span className="logo-icon">LF</span>
                            <h2>Create Account</h2>
                        </div>
                        <p className="auth-subtitle">Join the Lost & Found community</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <span className="error-icon">!</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon user-icon"></span>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address (@neu.edu.ph)</label>
                            <div className="input-wrapper">
                                <span className="input-icon mail-icon"></span>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="yourname@neu.edu.ph"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <small className="field-note">Must use @neu.edu.ph email address</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="studentId">Student ID (Format: XX-XXXXX-XXX)</label>
                            <div className="input-wrapper">
                                <span className="input-icon id-icon"></span>
                                <input
                                    id="studentId"
                                    type="text"
                                    name="studentId"
                                    placeholder="22-12975-964"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <small className="field-note">Example: 22-12975-964</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <div className="input-wrapper">
                                <span className="input-icon phone-icon"></span>
                                <input
                                    id="contactNumber"
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="09123456789"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <small className="field-note">Philippine mobile number (11 digits)</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon lock-icon"></span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button 
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1"
                                >
                                    <span className={showPassword ? "eye-off-icon" : "eye-icon"}></span>
                                </button>
                            </div>
                            <small className="field-note">Minimum 6 characters</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon lock-icon"></span>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button 
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex="-1"
                                >
                                    <span className={showConfirmPassword ? "eye-off-icon" : "eye-icon"}></span>
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`auth-submit ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-small"></span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;