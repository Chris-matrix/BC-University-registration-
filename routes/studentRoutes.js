import express from 'express';
import { register, login, renderRegisterPage, renderLoginPage, renderDashboardPage } from '../controllers/studentController.js'; // Ensure this path is correct
import isAuthenticated from '../middleware/isAuthenticated.js'; // Ensure this path is correct

const router = express.Router();

// Redirect root URL to frontpage
router.get('/', (req, res) => {
  res.render('frontpage');
});

// Route to render the admin page
router.get('/admin', isAuthenticated, async (req, res) => {
  try {
    const [users] = await req.dbConnection.execute('SELECT * FROM users');
    const [courses] = await req.dbConnection.execute('SELECT * FROM courses');
    res.render('Staff&Faculty/admin', {
      title: 'Admin Dashboard',
      users,
      courses
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).send('Error fetching admin data');
  }
});

// Route to render the registration page
router.get('/register', renderRegisterPage);

// Handle registration form submission
router.post('/register', register);

// Route to render the login page
router.get('/login', renderLoginPage);

// Handle login form submission
router.post('/login', login);

// Render the dashboard page
router.get('/dashboard', isAuthenticated, renderDashboardPage);

// Route to get all courses
router.get('/courses', isAuthenticated, async (req, res) => {
  try {
    const [courses] = await req.dbConnection.execute('SELECT * FROM courses');
    res.render('courses', { courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

// Route to add a new course
router.post('/courses/add', isAuthenticated, async (req, res) => {
  const { name, code, capacity } = req.body;
  const createdAt = new Date(); // Add the current date and time
  try {
    await req.dbConnection.execute('INSERT INTO courses (name, code, capacity, createdAt) VALUES (?, ?, ?, ?)', [name, code, capacity, createdAt]);
    res.redirect('/courses');
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).send('Error adding course');
  }
});

// Route to remove a course
router.post('/courses/remove', isAuthenticated, async (req, res) => {
  const { code } = req.body;
  try {
    await req.dbConnection.execute('DELETE FROM courses WHERE code = ?', [code]);
    res.redirect('/courses');
  } catch (error) {
    console.error('Error removing course:', error);
    res.status(500).send('Error removing course');
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
