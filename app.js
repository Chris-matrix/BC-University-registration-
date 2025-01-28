const express = require('express');
const connectDB = require('./src/config/db.js');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
connectDB();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views'); // Ensure this path is correct

// Routes
const studentRoutes = require('./src/routes/studentRoutes');

// Routes
app.use('/', studentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});