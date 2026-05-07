const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['users', 'admin'],
        default: 'users'
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparedPassword = async function(enterpassword) {
   return await bcrypt.compare(enterpassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)