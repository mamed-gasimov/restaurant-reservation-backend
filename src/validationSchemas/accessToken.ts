import Joi from 'joi';

export const getAccessTokenSchema = Joi.object().keys({
  userId: Joi.string().trim().required().messages({
    'string.base': 'userId must be valid',
    'string.required': 'userId must be valid',
  }),
});
