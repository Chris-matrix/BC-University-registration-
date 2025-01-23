import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import authRoutes from './src/routes/authRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import sequelize from './src/config/config.js';
import User from './src/models/User.js';
import Course from './src/models/course.js';

dotenv.config();

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Ensure this points to your views directory

// Global Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index'); // Ensure you have an index.ejs file in your views directory
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});