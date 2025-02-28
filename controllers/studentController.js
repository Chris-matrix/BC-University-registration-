import bcrypt from 'bcryptjs';
import User from '../models/Student.js'; // Adjust the path as needed
import Course from '../models/Course.js'; // Assuming you have a Course model

// Render the login page
export const renderLoginPage = (req, res) => {
  res.render('login', { title: 'Login' });
};

// Render the registration page
export const renderRegisterPage = (req, res) => {
  res.render('register', { title: 'Register' });
};

// Handle login form submission
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    // Set session and redirect based on user role
    req.session.userId = user.id;
    req.session.role = user.role;

    switch (user.role) {
      case 'admin':
        return res.redirect('/admin');
      case 'faculty':
        return res.redirect('/teacher');
      default:
        return res.redirect('/dashboard');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

// Handle registration form submission
export const register = async (req, res) => {
  console.log('Request body:', req.body); // Log the request body

  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).send('All fields are required.');
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    // Hash password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Something broke!');
  }
};

// Render the dashboard page
export const renderDashboardPage = async (req, res) => {
  try {
    // Fetch the logged-in user and available courses
    const user = await User.findByPk(req.session.userId);
    const courses = await Course.findAll(); // Assuming you have a Course model

    res.render('dashboard', { title: 'Dashboard', user, courses });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};