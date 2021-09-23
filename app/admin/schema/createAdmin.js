const Joi = require('joi');

const createAdminSchema = Joi.object({
    first_name: Joi.string().required().min(3),
    last_name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    role: Joi.string().valid('super-admin', 'admin', 'user-admin').required(),
    password: Joi.string().required().min(7),
});

module.exports = createAdminSchema;