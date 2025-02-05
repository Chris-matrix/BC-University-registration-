import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Ensure this path is correct

// Handle login form submission
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }
    req.session.userId = user.id;
    req.session.role = user.role;
    if (user.role === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
};

// Handle registration form submission
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword, role });

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during registration');
  }
};