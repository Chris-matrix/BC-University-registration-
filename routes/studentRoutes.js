import express from 'express';
import { register, renderRegisterPage, login, renderLoginPage, renderDashboardPage } from '../controllers/studentController.js';

const router = express.Router();

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Redirect root URL to frontpage
router.get('/', (req, res) => {
  res.render('frontpage');
});

// Route to render the admin page
router.get('/admin', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    const courses = await Course.find().populate('instructor');
    res.render('Staff&Faculty/admin', { 
      title: 'Admin Dashboard',
      users,
      courses
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Render the registration page
router.get('/register', renderRegisterPage);

// Handle registration form submission
router.post('/register', register);

// Render the login page
router.get('/login', renderLoginPage);

// Handle login form submission
router.post('/login', login);

// Render the dashboard page
router.get('/dashboard', isAuthenticated, renderDashboardPage);

// Add logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

export default router;