const Joi = require('@hapi/joi');

const schema = Joi.object({
    date:Joi.date().required(),
    amount:Joi.number().required(),
})

module.exports = (data)=> schema.validate(data) ;