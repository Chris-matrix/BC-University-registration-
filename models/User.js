import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Adjust the path as needed

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('User table created if it does not exist');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

export default User;