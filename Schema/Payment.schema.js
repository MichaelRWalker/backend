const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    date:Date,
    amount:Number,
},
{
    timestamp:true
})

module.exports = paymentSchema