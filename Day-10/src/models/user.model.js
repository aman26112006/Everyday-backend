const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique : [true,"user already exists with this email"]
    },
    password:String
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel
