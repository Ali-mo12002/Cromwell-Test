const express = require('express');
const User = require('../models/User');
const { signToken, authMiddleware } = require('../middleware');
const bcrypt = require('bcryptjs');
const router = express.Router();
// Register route
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email }); // Check if a user with the given email already exists
  if (existingUser) {
    return res.status(400).json({ message: 'authentication / submission has failed' });
  }

  const user = new User({ email, name, password });
  await user.save();

  const token = signToken(user);

  res.status(200).json({message: 'User registered successfully', token, user });
});
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'authentication / submission has failed' });
  }

  const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with stored hash
  if (!isMatch) {
    return res.status(400).json({ message: 'authentication / submission has failed' });
  }

  const token = signToken(user);
  res.status(200).json({ token, user });
});
// User route
router.get('/profile', authMiddleware,  async (req, res) => {
  const user = req.user; // Extract the authenticated user's information from the request
  res.status(200).json({ email: user.email, name: user.name });
});

module.exports = router;
