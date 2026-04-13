const express = require('express')
const usermodel = require('../models/user.model')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const authRoutes = express.Router()
const crypto = require("crypto")

authRoutes.post('/register',async (req,res)=>{
    const {name,email,password} = req.body
    const ifalreadyexist = await usermodel.findOne({email})

    if(ifalreadyexist){
        return res.status(409).json({
            message:"user already exists with this email"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await usermodel.create({
        name,email,password:hash
    })
    const token = jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET
    )
    res.cookie('jwt_token',token)
    res.status(201).json({
        message:"user registered",
        user
    })
})
authRoutes.post('/login',async (req,res) =>{
    const{email,password} = req.body
    const user = await usermodel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found with this email address"
        })
    }
    const ispasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!ispasswordMatched){
        return res.status(404).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({
        email:user.email,
        id:user.id
    },process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(200).json({
        message:"User login Successfully!",
        user
    })
})
module.exports = authRoutes