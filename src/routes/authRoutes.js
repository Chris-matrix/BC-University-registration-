const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// Registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Course listing page
router.get('/courses', (req, res) => {
  res.render('courses');
});

// Student dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Admin panel
router.get('/admin', (req, res) => {
  res.render('admin');
});

module.exports = router;
