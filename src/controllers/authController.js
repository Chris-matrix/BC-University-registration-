const User = require('../models/User');
const bcrypt = require('bcrypt');

// Registration logic
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role || 'student', // Default role is 'student'
    });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login logic
exports.login = async (req, res) => {
  // Implement login logic here
};
