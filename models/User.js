import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js'; // Adjust the path as needed

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false, // Equivalent to required: true in Mongoose
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validate email format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'),
        defaultValue: 'student', // Equivalent to default: 'student' in Mongoose
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Equivalent to default: Date.now in Mongoose
    },
}, {
    timestamps: false, // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

export default User;