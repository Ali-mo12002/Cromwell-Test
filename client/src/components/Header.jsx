import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectAuth } from '../redux/authSlice';
import styles from '../styling/Header.module.css';
import logo from '../assets/Logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const user = useSelector((state) => state.auth.user); // Fetching user from Redux  store
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Handle logout logic: clear token and user from Redux store and localStorage
    localStorage.removeItem('id_token');
    dispatch(logout());
    window.location.assign('/login'); // Redirect to login page
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu on mobile
  };

  return (
    <header className={styles.header}>
      <Link to='/'>
      <img src={logo} alt="logo" />
      </Link>
      {/* Hamburger Menu Icon */}
      <div className={styles.navContainer}>
      <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
        &#9776; {/* This is the hamburger icon */}
      </div>
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.active  : ''}`}>
       {/* Nav bar links when logged out */}
        {!user && (
          <>
          <Link to="/" className={styles.navLink}>
            Home
            </Link>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        )}
        {user && (
          <>
          {/* Nav bar when logged in*/}

          <span className={styles.userName}>Welcome, {user?.name}</span>

          <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </nav>
      </div>
    </header>
  );
};

export default Header;
