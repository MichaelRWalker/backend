const router = require('express').Router();
const {User , Appointment} = require('../models/models');
const validation = require('../validation/Appointment.validation');
const verify = require('../middlewares/verify');

router.get('/',verify,async(req,res)=>{
    // find user
    const userID = req.user._id;
    const user = await User.findById(userID);
    if(!user)return res.status(400).send('User Not Found')
    // return appointments
    res.send(user.appointments);
    
});
router.post('/',verify,async(req,res)=>{
    // find user
    const userID = req.user._id;
    const user = await User.findById(userID);
    if(!user)return res.status(400).send('User Not Found')
    // validate appointment
    const {error} = validation(req.body);
    if(error)return res.status(400).send(error);

    // add appointment
    const appointment = new Appointment(req.body);
    user.appointments.push(appointment);
    // save user
    user.save();
    res.send(appointment);
});
router.put('/:id',verify,async(req,res)=>{
    // find user
    const userID = req.user._id;
    const user = await User.findById(userID);
    if(!user)return res.status(400).send('User Not Found')
    // validate appointment
    const {error} = validation(req.body);
    if(error)return res.status(400).send(error);

    // add appointment
    const appId = req.params.id;
    const appointment = user.appointments.id(appId);
    appointment.set(req.body);
    // save user
    user.save();
    res.send(appointment);
});
router.delete('/:id',verify,async(req,res)=>{
    // find user
    const userID = req.user._id;
    const user = await User.findById(userID);
    if(!user)return res.status(400).send('User Not Found')

    // add appointment
    const appId = req.params.id;
    const appointment = user.appointments.id(appId);
    appointment.remove();
    // save user
    user.save();
    res.send('Appointment Removed');
});

module.exports = router