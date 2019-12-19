const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    hours:Number,
    action:String,
    cost:Number,
    date:Date

},{timestamp:true})

module.exports = sessionSchema