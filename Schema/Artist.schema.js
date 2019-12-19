const mongoose = require('mongoose');
const projects = require('./Project.schema')


const artistSchema = mongoose.Schema({
    name:String,
    genre:String,
    projects:[projects],
    email:String,
    members:Array,
    notes:String,
    totalOwed:Number
},{
    timestamp:true
})

module.exports = artistSchema