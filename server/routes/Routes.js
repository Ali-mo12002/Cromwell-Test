const express = require('express');
const User = require('../models/User');
const { signToken } = require('../middleware');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ email, name, password });
  await user.save();

  const token = signToken(user);
  console.log(user)

  res.status(201).json({ token, user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user);
  res.json({ token, user });
});

router.get('/profile', async (req, res) => {
  const user = req.user; 
  res.json({ user });
});

module.exports = router;
