import { NextFunction, Response } from 'express';
import { ObjectSchema } from 'joi';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from './errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';

export const validateSchema =
  (schema: ObjectSchema) => async (req: ExtendedRequest, _res: Response, next: NextFunction) => {
    const { error } = await Promise.resolve(schema.validate(req.body));

    if (error?.details) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, error.message);
      return next(err);
    }

    next();
  };
