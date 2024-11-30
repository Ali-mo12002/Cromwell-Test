import React from 'react';
import styles from '../styling/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Cromwell Test</h1>
      <p className={styles.description}>Login or Register to continue</p>
    </div>
  );
};

export default Home;
