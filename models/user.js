const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'name is req'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is req'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User