import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().required().messages({
    'string.base': 'email must be valid',
    'string.required': 'email must be valid',
    'string.email': 'email must be valid',
  }),
  password: Joi.string().trim().required().min(8).max(32).messages({
    'string.base': 'password must be valid',
    'string.required': 'password must be valid',
    'string.min': 'Password must be at least 8 characters long!',
    'string.max': 'Password can not be more than 32 characters long!',
  }),
});
