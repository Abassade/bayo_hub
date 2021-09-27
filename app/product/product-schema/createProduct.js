const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().required().min(3),
    price: Joi.number().required(),
    status: Joi.string().valid('approved', 'disapproved', 'pending'),
    cost: Joi.number().required().min(7),
});

module.exports = createProductSchema;