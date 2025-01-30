const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const User = require('../models/User'); 
const Course = require('../models/Course'); // Error points here:  you need to remain these to mactch the lowercase file name you importing

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

// Route to render the teacher page
router.get('/teacher', isAuthenticated, async (req, res) => {
  try {
    const teacher = await User.findById(req.session.userId);
    const courses = await Course.find({ instructor: req.session.userId }).populate('students');
    res.render('Staff&Faculty/teacher', { 
      title: 'Teacher Dashboard',
      teacher,
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route to render the course page
router.get('/course', isAuthenticated, async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor');
    const user = await User.findById(req.session.userId).populate('enrolledCourses');
    res.render('course', { 
      title: 'Course Enrollment', 
      courses, 
      user 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Add a new route to enroll in a course
router.post('/course/enroll/:courseId', isAuthenticated, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const user = await User.findById(req.session.userId);

    if (!course || !user) {
      return res.status(404).send('Course or user not found');
    }

    // Check if user is already enrolled
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).send('Already enrolled in this course');
    }

    // Check if course is full
    if (course.students.length >= course.capacity) {
      return res.status(400).send('Course is full');
    }

    // Add course to user's enrolled courses
    user.enrolledCourses.push(course._id);
    await user.save();

    // Add user to course's students
    course.students.push(user._id);
    await course.save();

    res.redirect('/dashboard');
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

// Update dashboard route to include course information
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .populate({
        path: 'enrolledCourses',
        populate: { path: 'instructor' }
      });
    
    res.render('dashboard', { 
      title: 'Dashboard',
      user,
      courses: user.enrolledCourses
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

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

module.exports = router;