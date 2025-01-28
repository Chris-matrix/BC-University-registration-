import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.render('./frontpage');
});


router.get('/login', (req, res) => {
    res.render('./login');
  });
  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
router.get('/register', (req, res) => {
    res.render('./register');
  });
// Register a new student
router.post('/register', async (req, res) => {
    try {
      const { name, email, age, course } = req.body;
      const student = new Student({ name, email, age, course });
      await student.save();
      res.status(201).json({ message: 'Registration successful!', student });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Login a student
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const student = await Student.findOne({ email, password });
      if (!student) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      req.session.student = student; // Store student in session
      res.status(200).json({ message: 'Login successful!', student });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all registered students
  router.get('/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;