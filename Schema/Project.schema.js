const mongoose = require('mongoose');
const sessions = require('./Session.schema');
const payments = require('./Payment.schema');

const projectSchema = mongoose.Schema({
    tracks:Number,
    deposit:Number,
    sessions:[sessions],
    projectName:String,
    startDate:Date,
    finishDate:Date,
    payments:[payments]
})

module.exports = projectSchema;