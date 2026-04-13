const express = require('express')
const usermodel = require('../models/user.model')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const authRoutes = express.Router()

authRoutes.post('/register',async (req,res)=>{
    const {name,email,password} = req.body
    const ifalreadyexist = await usermodel.findOne({email})

    if(ifalreadyexist){
        return res.status(409).json({
            message:"user already exists with this email"
        })
    }
    const user = await usermodel.create({
        name,email,password
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
        user,
        token
    })
})

module.exports = authRoutes