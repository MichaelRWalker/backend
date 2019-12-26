const Joi = require('@hapi/joi');

const schema = Joi.object({
    hours:Joi.number().required(),
    action:Joi.string(),
    cost:Joi.number(),
    date:Joi.date()
});

module.exports = (data)=> schema.validate(data) ;