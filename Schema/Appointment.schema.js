const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    artist:String,
    date:Date,
    time:Date,
    location:String,
},
{
    timestamp:true
}
);

module.exports = appointmentSchema;