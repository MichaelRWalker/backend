const Joi = require('@hapi/joi');

const schema = Joi.object({
    name:Joi.string().min(3).max(255),
    studioName:Joi.string().min(3).max(255),
    studioType:Joi.string().min(3).max(255),
    email:Joi.string().email().min(6).max(255),
    password:Joi.string().min(8).max(1024),
});

let validation = 

module.exports = (data)=> schema.validate(data) ;