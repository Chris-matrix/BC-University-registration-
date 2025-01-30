const sequelize = require('sequelize');

const courseSchema = new sequelize.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: sequelize.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: sequelize.Schema.Types.ObjectId,
        ref: 'User'
    }],
    capacity: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = sequelize.model('Course', courseSchema);