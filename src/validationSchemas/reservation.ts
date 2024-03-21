import Joi from 'joi';

export const reservationSchema = Joi.object().keys({
  userId: Joi.string().trim().required().messages({
    'string.base': 'userId must be valid',
    'string.required': 'userId must be valid',
  }),
  restaurantId: Joi.string().trim().required().messages({
    'string.base': 'restaurantId must be valid',
    'string.required': 'restaurantId must be valid',
  }),
  date: Joi.date().greater('now').required().messages({
    'date.base': 'date must be valid',
    'date.required': 'date must be valid',
  }),
  time: Joi.string().trim().required().messages({
    'string.base': 'time must be valid',
    'string.required': 'time must be valid',
  }),
  numberOfPeople: Joi.number().integer().greater(0).required().messages({
    'number.base': 'numberOfPeople must be valid',
    'number.required': 'numberOfPeople must be valid',
  }),
  additionalNotes: Joi.string().trim().optional().messages({
    'string.base': 'additionalNotes must be valid',
  }),
});
