const Joi = require('@hapi/joi');

const schema = Joi.object({
email:Joi.string().required().min(6).max(255).email(),
password:Joi.string().required().min(8).max(255),
});

module.exports = (data)=> schema.validate(data) ;