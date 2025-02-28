import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import sequelize from './config/db.js'; // Adjust the path as needed
import studentRoutes from './routes/studentRoutes.js'; // Ensure this path is correct
import Course from './models/Course.js'; // Ensure this path is correct
import Student from './models/Student.js'; // Ensure this path is correct
import { login, register } from './controllers/studentController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware // Use the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.post('/login', login);
app.post('/register', register);

// Sync the models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true }); // Sync models with the database
    console.log('All models were synchronized successfully.');

    // Routes
    app.use('/', studentRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();