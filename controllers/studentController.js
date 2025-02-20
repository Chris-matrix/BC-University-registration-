import bcrypt from 'bcryptjs';

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
  const dbConnection = req.dbConnection;
  try {
    const [rows] = await dbConnection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).send('Invalid email or password.');
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }
    req.session.userId = user.id;
    req.session.role = user.role;
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
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).send('All fields are required.');
  }
  const dbConnection = req.dbConnection;
  try {
    const [existingUser] = await dbConnection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).send('Email is already registered.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnection.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role]);
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something broke!');
  }
};

// Render the dashboard page
export const renderDashboardPage = async (req, res) => {
  const dbConnection = req.dbConnection;
  try {
    const [user] = await dbConnection.execute('SELECT * FROM users WHERE id = ?', [req.session.userId]);
    const [courses] = await dbConnection.execute('SELECT * FROM courses');
    res.render('dashboard', { title: 'Dashboard', user: user[0], courses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};