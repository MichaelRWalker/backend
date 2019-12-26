const Joi = require('@hapi/joi');

const schema = Joi.object({
    name:Joi.string().min(3).max(255).required(),
    genre:Joi.string().required(),
    email:Joi.string().email().required(),
    members:Joi.array(),
    notes:Joi.string().allow(''),
    totalOwed:Joi.number(),
});

module.exports = (data)=> schema.validate(data) ;