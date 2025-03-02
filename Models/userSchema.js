const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'you must enter the name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'you most enter email'],
        unique: true
    },
    password: {
        type: String,
        required: [true , 'You must entre the password'],
        unique: true,
        minlength: [6 , "This is password too short"]
    },
    phoneNumber: {
        type: Number,
        required: [true, 'you must enter phoneNumber'],
        unique: true 
    },
    avatar:{
        type: String,
        default: ""
    },
},
    {
        timestamps: true
    }
);


userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    if (typeof this.password !== 'string') {
        return next(new Error('Password must be a string'));
    }

    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
    next();
});
module.exports = mongoose.model('User',userSchema)