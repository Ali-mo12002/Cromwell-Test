import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
const App = () => {
  const user = useSelector((state) => state.auth.user); // Get the user from Redux store

  return (
    <Router>
      <Header />
        <Routes>
        <Route path="/" element={user ? <LandingPage /> : <Home />} /> 
          <Route path="/login" element={user ? <LandingPage /> : <Login />} /> 
          <Route path="/register" element={user ? <LandingPage /> : <Register />} />
          <Route path="/landing" element={user ? <LandingPage /> : <Login />} /> 
        </Routes>
    </Router>
  );
};

export default App;
