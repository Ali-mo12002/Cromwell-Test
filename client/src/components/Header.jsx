import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectAuth } from '../redux/authSlice'; // Redux actions and selectors
import styles from '../styling/Header.module.css';
import logo from '../assets/Logo.svg'; // Your logo file

const Header = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector(selectAuth); // Retrieve the token and user from the Redux store
  const handleLogout = () => {
    // Handle logout logic: clear token and user from Redux store and localStorage
    localStorage.removeItem('id_token');
    dispatch(logout());
    window.location.assign('/login'); // Redirect to login page
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} /> {/* Keep the logo */}

      <nav className={styles.nav}>
       

        {/* Conditionally render Login and Register links based on user authentication */}
        {!token ? (
          <>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Display the user's name if logged in */}
            <span className={styles.userName}>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
