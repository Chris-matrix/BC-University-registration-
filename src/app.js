const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseroutes');
const User = require('./models/User');
const Course = require('./models/course');

dotenv.config();

const app = express();

// Global Middleware
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(loggingMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MySQL and sync models
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL successfully!'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully!'))
  .catch(err => console.error('Error syncing database:', err));

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
