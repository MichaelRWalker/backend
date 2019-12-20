const router = require('express').Router();
const {User} = require('../models/models')
const loginValidation = require('../validation/Login.validation')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async (req,res)=>{
    console.log(req);
    // Checking for incorrect entries
    const {error} =  loginValidation(req.body);
    if(error)return res.status(400).send(error)
    console.log('Made it past validation')
    //Checking if user is unique
    const user = await User.findOne({email:req.body.email});
    if(!user)return res.status(400).send('Email or Password is incorrect');
    console.log('made it past log in validation')
    //Checking Password
    const validPassword = await bcryptjs.compare(req.body.password,user.password)
    if(!validPassword)return res.status(400).send('Email or Password is incorrect');
    console.log('you made it past log in validation again')
    //create and assign token
    const secret = process.env.TOKEN_SECRET
    const token = jwt.sign({_id:user._id},secret);
    console.log('token made')
    res.header('auth-token',token).send(token)
    console.log('token sent')

})

module.exports = router