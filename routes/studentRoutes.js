import express from 'express';
import { register, login } from '../controllers/studentController.js'; // Ensure this path is correct
import isAuthenticated from '../middleware/isAuthenticated.js'; // Ensure this path is correct
import Course from '../models/Course.js'; // Ensure this path is correct

const router = express.Router();

// Redirect root URL to frontpage
router.get('/', (req, res) => {
  res.render('frontpage');
});

// Route to render the admin page
router.get('/admin', isAuthenticated, async (req, res) => {
  try {
    const users = await User.findAll();
    const courses = await Course.findAll({ include: 'instructor' });
    res.render('Staff&Faculty/admin', {
      users,
      courses,
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).send('Error fetching admin data');
  }
});

// Route to render the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration form submission
router.post('/register', async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error during registration');
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).send('Invalid credentials');
  }
});

// Render the dashboard page
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.render('dashboard', { courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

// Add logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

export default router;
