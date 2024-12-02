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
        <Route path="/" element={user ? <LandingPage /> : <Home />} /> {/*Home route - if user is logged in they are redirected to Landing page*/}
          <Route path="/login" element={user ? <LandingPage /> : <Login />} />  {/*Login route - if user is logged in they are redirected to Landing page*/}
          <Route path="/register" element={user ? <LandingPage /> : <Register />} /> {/*Register route - if user is logged in they are redirected to Landing page*/}
          <Route path="/landing" element={user ? <LandingPage /> : <Login />} /> {/*Landing route - if user is not logged in they are redirected to Login page*/}
        </Routes>
    </Router>
  );
};

export default App;
