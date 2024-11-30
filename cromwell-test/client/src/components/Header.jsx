import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styling/Header.module.css';
import logo from '../assets/Logo.svg'
const Header = () => {
  return (
    <header className={styles.header}>
        <img src={logo} alt="logo" />
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/login" className={styles.navLink}>
          Login
        </Link>
        <Link to="/register" className={styles.navLink}>
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
