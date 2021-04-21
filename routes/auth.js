const express = require('express')
const jwt = require('jsonwebtoken')
const Auth = require('../helper/auth')
const User = require('../model/user')
const router = express.Router()

router.get("/",async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})

router.post('/register', async (req,res)=>{
    try {
        const isUserRegistered = await Auth.Register(req.body)
        if(isUserRegistered == null){
            res.status(500).send('Somthing went Wrong')
        }
        else res.json(isUserRegistered)
    } catch (error) {
        console.log(error);
        res.status(500).send('Somthing went Wrong')
    }
})

router.post('/login', async (req,res)=>{
    try {
        const [isValid,user] = await Auth.CheckUser(req.body)

        if(isValid){
            console.log(user);
            const token = jwt.sign({
                username:user.username,
                role: user.role,
                useid: user._id
            }, process.env.JWT_KEY, {
                expiresIn: "2h"
            })
            res.status(200).json({
                message: "Auth successful",
                token: token
            });
        }
        else res.status(401).send('Auth Failed')
    } catch (error) {
        console.log(error);
        res.status(500).send('Somthing went Wrong')
    }
})

module.exports =  router