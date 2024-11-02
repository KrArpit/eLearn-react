const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    userEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic regex for email validation
        'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
        type: String
      }  
},{timestamps: true}) //adds createdAt and updatedAt timestamps

const User = mongoose.model('User', UserSchema);
module.exports = User;