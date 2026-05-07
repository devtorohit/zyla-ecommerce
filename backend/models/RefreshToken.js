const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    token:{
        type:String,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:'7d'
    }
})

module.exports = mongoose.model("RefreshToken" , RefreshTokenSchema)