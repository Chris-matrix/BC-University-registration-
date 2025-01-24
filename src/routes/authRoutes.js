import express from 'express';
import { ensureAuthenticated } from '../middleware/auth.js';
const router = express.Router();

let users = []; // In-memory user storage
let courses = [ // Sample courses data
  { name: 'Math 101', code: 'MATH101', capacity: 30, enrolledStudents: [] },
  { name: 'Physics 101', code: 'PHYS101', capacity: 25, enrolledStudents: [] },
  { name: 'Chemistry 101', code: 'CHEM101', capacity: 20, enrolledStudents: [] }
];

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;

  // Basic validation
  if (!username || !email || !password || !role) {
    return res.send('All fields are required');
  }

  // Check if user already exists
  const userExists = users.find(user => user.username === username || user.email === email);
  if (userExists) {
    return res.send('User already exists');
  }

  // Store user details
  users.push({ username, email, password, role });
  res.send('Register successful');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Add your authentication logic here
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.isAuthenticated = () => true; // Mock authentication
    res.redirect('/dashboard'); // Redirect to the dashboard after successful login
  } else {
    res.send('Login failed');
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.isAuthenticated = () => false; // Mock logout
  res.redirect('/login');
});

// Protected routes
router.get('/courses', ensureAuthenticated, (req, res) => {
  res.render('courses', { courses });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { courses });
});

// Admin panel
router.get('/admin', ensureAuthenticated, (req, res) => {
  res.render('admin');
});

export default router;