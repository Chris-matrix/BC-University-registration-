const express = require('express');
const connectDB = require('./config/db.js');
const app = express();
const PORT = 27017;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
connectDB();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Ensure this path is correct

// Routes
const studentRoutes = require('./routes/studentRoutes.js');

// Routes
app.use('/', studentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});