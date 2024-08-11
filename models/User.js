const mongoose =require('mongoose')

const bcrypt =require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema)

module.exports =User;