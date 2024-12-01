import React from 'react';
import { useSelector } from 'react-redux';  // To get user data from Redux store
import { useNavigate } from 'react-router-dom';
import styles from '../styling/LandingPage.module.css';  // Optional: For styling

const LandingPage = () => {
  const user = useSelector((state) => state.auth.user); // Get the user from Redux store
  const navigate = useNavigate();

  // Redirect to login if the user is not logged in
  if (!user) {
    navigate('/login');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome, {user ? user.name : 'Guest'}!</h1>
      <p className={styles.message}>You are logged in. Enjoy your stay!</p>
    </div>
  );
};

export default LandingPage;