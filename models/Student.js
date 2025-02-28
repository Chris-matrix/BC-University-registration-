import bcrypt from 'bcryptjs';
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Adjust the path as needed

const Student = sequelize.define('Student', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;

export const createStudent = async (dbConnection, { fullName, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await dbConnection.execute(
    'INSERT INTO students (fullName, email, password, role) VALUES (?, ?, ?, ?)',
    [fullName, email, hashedPassword, role]
  );
  return result.insertId;
};

export const findStudentByEmail = async (dbConnection, email) => {
  const [rows] = await dbConnection.execute('SELECT * FROM students WHERE email = ?', [email]);
  return rows[0];
};

export const findStudentById = async (dbConnection, id) => {
  const [rows] = await dbConnection.execute('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0];
};

export const register = async (req, res) => {
  const { fullName, email, password, role } = req.body; // Ensure fullName is included

  if (!fullName || !email || !password || !role) {
    return res.status(400).send('All fields are required.');
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    // Hash password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName, // Include fullName here
      email,
      password: hashedPassword,
      role,
    });

    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Something broke!');
  }
};