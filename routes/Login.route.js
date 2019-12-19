const router = require('express').Router();
const {User} = require('../models/models')
const loginValidation = require('../validation/Login.validation')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async (req,res)=>{
    // Checking for incorrect entries
    const {error} =  loginValidation(req.body);
    if(error)return res.status(400).send(error)

    //Checking if user is unique
    const user = await User.findOne({email:req.body.email});
    if(!user)return res.status(400).send('Email or Password is incorrect');

    //Checking Password
    const validPassword = await bcryptjs.compare(req.body.password,user.password)
    if(!validPassword)return res.status(400).send('Email or Password is incorrect');

    //create and assign token
    const secret = process.env.TOKEN_SECRET
    const token = jwt.sign({_id:user._id},secret);
    res.header('auth-token',token).send(token)

})

module.exports = router