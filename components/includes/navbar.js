// components/includes/Navbar.js
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import nookies from 'nookies';
import SearchModal from "../shared/SearchModal";

function Navbar({ toggleSidebar }) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);
   
    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auth check
    useEffect(() => {
        const cookies = nookies.get(null);
        if (cookies.user) {
            setUser(JSON.parse(cookies.user));
        }
    }, []);

    const setAuthToken = () => {
        const cookies = nookies.get();
        return cookies.token ? { Authorization: `Bearer ${cookies.token}` } : {};
    };

    const handleLogout = async () => {
        try {
            const headers = setAuthToken();
            const response = await fetch('https://api.pitchpredictions.com/api/logout', {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Logout failed');
            }

            nookies.destroy(null, 'token', { path: '/' });
            nookies.destroy(null, 'user', { path: '/' });
            window.location.replace('/');
        } catch (error) {
            alert('Logout failed');
        }
    };

    const openSearchModal = () => {
        setShowSearchModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeSearchModal = () => {
        setShowSearchModal(false);
        document.body.style.overflow = 'unset';
    };

    return ( 
        <React.Fragment>
            {/* Top Bar with Social Links and Auth */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-inner">
                        <div className="social-links">
                            <a
                                href="https://www.facebook.com/profile.php?id=100094600476269"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a
                                href="https://t.me/betsassuredkenya"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Telegram"
                            >
                                <i className="bi bi-telegram"></i>
                            </a>
                            <a
                                href="https://api.whatsapp.com/send/?phone=254111509962&text=Hello&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <i className="bi bi-whatsapp"></i>
                            </a>
                        </div>
                        
                        <div className="auth-buttons">
                            {user ? (
                                <>
                                    <a href="/auth/dashboard" className="auth-link dashboard-link">Dashboard</a>
                                    <button onClick={handleLogout} className="auth-link logout-btn">Logout</button>
                                </>                  
                            ) : (
                                <>
                                    <a href="/auth/login" className="auth-link login-link">Login</a>
                                    <a href="/auth/register" className="auth-link register-link">Register</a>
                                </>
                            )}                      
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`main-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container">
                    <div className="navbar-inner">
                        {/* Mobile Menu Button - NOW USING toggleSidebar PROP */}
                        <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="menu">
                            <span className="hamburger-icon">☰</span>
                        </button>

                        {/* Logo */}
                        <div className="logo-container">
                            <a href="/" className="logo-link">
                                <img src="/freewinningtipslogo.png" alt="Free Winning Tips - Football Betting Tips and Match Predictions" />
                            </a>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="nav-links-wrapper">
                            <ul className="nav-links">
                                <li className="nav-item">
                                    <a href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/tip-of-the-day" className={`nav-link ${router.pathname.includes('/tip-of-the-day') ? 'active' : ''}`}>💡 Tip of the Day</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/predictions/todays-predictions" className={`nav-link ${router.pathname.includes('/predictions') ? 'active' : ''}`}>📊 All Predictions</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/predictions/must-win-teams-today" className={`nav-link ${router.pathname.includes('/must-win') ? 'active' : ''}`}>🔥 Must Win Today</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/free-vip-tips-today" className={`nav-link ${router.pathname.includes('/free-vip-tips-today') ? 'active' : ''}`}>⭐ VIP Tips</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/jackpot-predictions" className={`nav-link ${router.pathname.includes('/jackpot') ? 'active' : ''}`}>Jackpot Predictions</a>
                                </li>
                            </ul>
                        </div>

                        {/* Desktop Search Button */}
                        <button className="search-btn" onClick={openSearchModal}>
                            <i className="bi bi-search"></i>
                            <span>Search</span>
                        </button>

                        {/* Mobile Search Icon */}
                        <button className="mobile-search-btn" onClick={openSearchModal}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <SearchModal isOpen={showSearchModal} onClose={closeSearchModal} />
        </React.Fragment>
    );
}

export default Navbar;