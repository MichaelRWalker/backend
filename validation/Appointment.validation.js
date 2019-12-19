const Joi = require('@hapi/joi');

const schema = Joi.object({
    artist:Joi.string().required(),
    date:Joi.date().required(),
    time:Joi.date().required(),
    location:Joi.string().required(),
})

module.exports = (data)=> schema.validate(data) ;