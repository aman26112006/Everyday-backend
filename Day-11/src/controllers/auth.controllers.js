const crypto = require('crypto')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


async function RegisterController(req,res){
    const {username,email,password,bio,profileImage} = req.body
    
    const IsUserExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(IsUserExists){
        return res.status(409).json({
            message:"user already exist" + (IsUserExists.email == email ?
                "Email already exists":"Username already Exists")
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered Successfully",
        user: {
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}
async function LoginController(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"User not Exists"
        })
    }
    const hash  = crypto.createHash('sha256').update(password).digest('hex')
    const ispassvalid = hash == user.password
    if(!ispassvalid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )
    res.cookie('token',token)

    res.status(200).json({
        message:"Login Successfully",
        user:{
            username:user.username,
            email: user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = {
    RegisterController,
    LoginController
}