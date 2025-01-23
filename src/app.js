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
app.use('/', authRoutes);
app.use('/', courseRoutes);

// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));
