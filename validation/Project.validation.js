const Joi = require('@hapi/joi');


const schema = Joi.object({
    tracks:Joi.number().required(),
    deposit:Joi.number().required(),
    projectName:Joi.string().required(),
    startDate:Joi.date(),
    finishDate:Joi.date()
})

module.exports = (data)=> schema.validate(data) ;

