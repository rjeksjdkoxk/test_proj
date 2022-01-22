const mongoose = require('mongoose');

const {Schema} = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is req'],
        trim: true,

    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task