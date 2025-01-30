import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

    const Course = sequelize.define('Courses', {
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        course_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        credits: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        professor: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        schedule: {
            type: DataTypes.JSON,
            defaultValue: {}
        },
        fee: {
            type: DataTypes.INTEGER(10, 2),
            allowNull: false
        }
    });

export default Course;