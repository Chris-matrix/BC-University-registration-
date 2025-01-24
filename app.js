import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';

dotenv.config();

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Adjust this path to match your project structure

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

// Root route
app.get('/', (req, res) => {
  res.render('dashboard'); // Render the dashboard.ejs view
});

// Routes
app.use('/', authRoutes);
app.use('/courses', courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});