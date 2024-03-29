import Joi from 'joi';

export const reservationSchema = Joi.object().keys({
  restaurantId: Joi.string().trim().required().messages({
    'string.base': 'restaurantId must be valid',
    'string.required': 'restaurantId must be valid',
  }),
  date: Joi.date()
    .greater(Date.now() - 24 * 60 * 60 * 1000)
    .required()
    .messages({
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

export const updateReservationSchema = Joi.object().keys({
  reservationId: Joi.string().trim().required().messages({
    'string.base': 'reservationId must be valid',
    'string.required': 'reservationId must be valid',
  }),
  status: Joi.string().trim().valid('approved', 'rejected').required().messages({
    'string.base': 'status must be valid',
    'string.required': 'status must be valid',
  }),
});
