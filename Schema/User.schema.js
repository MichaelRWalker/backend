const mongoose = require('mongoose');
const artists = require('./Artist.schema');
const appointments = require('../Schema/Appointment.schema')

const userSchema = mongoose.Schema({
    name:String,
    studioName:String,
    studioType:String,
    email:String,
    password:String,
    artists:[artists],
    appointments:[appointments]
})

module.exports = userSchema