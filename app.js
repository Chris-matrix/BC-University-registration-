import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import sequelize from './config/db.js'; // Ensure this path is correct
import studentRoutes from './routes/studentRoutes.js'; // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/', studentRoutes);

// Sync all models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });