import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import mysql from 'mysql2/promise';
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

// Database connection
const dbConnection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Attach the database connection to the req object
app.use((req, res, next) => {
  req.dbConnection = dbConnection;
  next();
});

// Routes
app.use('/', studentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});