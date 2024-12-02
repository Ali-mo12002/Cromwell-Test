
import { createSlice } from '@reduxjs/toolkit';

// Retrieve token and user from localStorage on initial load
const initialState = {
  token: localStorage.getItem('id_token') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // User from localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('id_token', action.payload.token); // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user to localStorage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('id_token'); // Remove token from localStorage
      localStorage.removeItem('user'); // Remove user from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
