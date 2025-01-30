const bcrypt = require('bcrypt');
const User = require("../models/User"); 


exports.renderDashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate('enrolledCourses');
    const courses = await Course.find();
    res.render('dashboard', { title: 'Dashboard', user, courses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Render the login page
exports.renderLoginPage = (req, res) => {
  res.render('login', { title: 'Login' });
};

// Render the registration page
exports.renderRegisterPage = (req, res) => {
  res.render('register', { title: 'Register' });
};


// Handle login form submission
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    // Store user ID and role in session for session management
    req.session.userId = user._id;
    req.session.role = user.role;

    // Redirect based on role
    if (user.role === 'admin') {
      res.redirect('/admin');
    } else if (user.role === 'faculty') {
      res.redirect('/teacher');
    } else {
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};




// Handle registration form submission
exports.register = async (req, res) => {

  const { fullName, email, password, role } = req.body;

  try {

      const existingUser = await User.findOne({ email });

      console.log("STUDENT:::", existingUser); 
      
      if (existingUser) {
        return res.status(400).send('Email is already registered.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ fullName, email, password: hashedPassword, role });
        await newUser.save();
        res.redirect('/login');
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};




// Render the dashboard page
// controllers/userController.js
exports.renderDashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate('enrolledCourses');
    const courses = await Course.find();
    res.render('dashboard', { title: 'Dashboard', user, courses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


