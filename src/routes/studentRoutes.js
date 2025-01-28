const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

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
  res.render('frontpage'); // Corrected path
});

// Route to render the admin page
router.get('/admin', (req, res) => {
  res.render('Staff&Faculty/admin', { title: 'Admin Dashboard' });
});

// Route to render the teacher page
router.get('/teacher', (req, res) => {
  res.render('Staff&Faculty/teacher', { title: 'Teacher Dashboard' });
});

// Route to render the course page
router.get('/course', isAuthenticated, async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch courses from the database
    const user = await User.findById(req.session.userId).populate('enrolledCourses'); // Fetch user from the database and populate enrolledCourses
    res.render('course', { title: 'Course Enrollment', courses, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route to render the login page
router.get('/login', studentController.renderLoginPage);
// Route to handle login form submission
router.post('/login', studentController.login);

// Route to render the registration page
router.get('/register', studentController.renderRegisterPage);
// Route to handle registration form submission
router.post('/register', studentController.register);

// Route to render the dashboard page
router.get('/dashboard', isAuthenticated, studentController.renderDashboardPage);


module.exports = router;