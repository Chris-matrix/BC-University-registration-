import express from 'express';
const router = express.Router();

let users = []; // In-memory user storage
let courses = [ // Sample courses data
  { name: 'Math 101', code: 'MATH101', capacity: 30, enrolledStudents: [] },
  { name: 'Physics 101', code: 'PHYS101', capacity: 25, enrolledStudents: [] },
  { name: 'Chemistry 101', code: 'CHEM101', capacity: 20, enrolledStudents: [] }
];

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Home page
router.get('/', (req, res) => {
  res.render('frontpage');
});

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;

  // Basic validation
  if (!username || !email || !password || !role) {
    return res.status(400).render('register', { error: 'All fields are required' });
  }

  // Check if user already exists
  const userExists = users.find(user => user.username === username || user.email === email);
  if (userExists) {
    return res.status(400).render('register', { error: 'User already exists' });
  }

  // Store user details
  users.push({ username, email, password, role });
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.session.user = user; // Store user in session
    res.redirect('/dashboard');
  } else {
    res.status(400).render('login', { error: 'Invalid username or password' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

// Protected routes
router.get('/courses', ensureAuthenticated, (req, res) => {
  res.render('courses', { courses });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user, courses });
});

// Admin panel
router.get('/admin', ensureAuthenticated, (req, res) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }
  res.render('admin', { users, courses });
});

export default router;
