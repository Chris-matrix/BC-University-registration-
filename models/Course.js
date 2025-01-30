import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js'; // Adjust the path as needed

const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, // Equivalent to required: true in Mongoose
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructorId: {
        type: DataTypes.INTEGER, // Assuming instructorId is an INTEGER (foreign key)
        allowNull: false,
        references: {
            model: 'Users', // Name of the referenced table
            key: 'id', // Primary key in the referenced table
        },
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Equivalent to default: Date.now in Mongoose
    },
}, {
    timestamps: false, // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

export default Course;