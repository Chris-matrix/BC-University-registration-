import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Adjust the path as needed

const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Add other fields as needed
});

export default Course;