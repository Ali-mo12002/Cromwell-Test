import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Importing login action from redux
import styles from '../styling/Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; // updating formdata fields
    setFormData({ ...formData, [name]: value });
  };
  const validatePassword = (password) => {
    // Regular expression for validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password); //Validation if user password meets requirements
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError('Password must contain at least one capital letter, one number, and be at least 8 characters long.');
      return; // error if user password does not meet requirements
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return; // error if passwords do not match
    }

    try { // sending register request to api
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // if registration successful, automatically log in the user
        const { token, user } = data;  // token and user are returned upon registration
        localStorage.setItem('id_token', token); // Store the token in localStorage
        localStorage.setItem('user', JSON.stringify(user)); // Store the user in localStorage
        dispatch(login({ token, user })); // Dispatch the login action to Redux
        navigate('/')
      } else {
        setError(data.message || 'Something went wrong!');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
