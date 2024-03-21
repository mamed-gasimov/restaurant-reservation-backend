import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HTTP_STATUSES } from '@typeDefinitions/general';
import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from './errorHandler';

export const authenticateToken = (req: ExtendedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  let token = null;

  if (authHeader) {
    const splited = authHeader.split(' ');
    if (splited.length > 1) {
      token = splited[1];
    }
  }

  if (token == null) {
    const err = new CustomError(HTTP_STATUSES.NOT_AUTHORIZED);
    return next(err);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user: string) => {
    if (err) {
      const error = new CustomError(HTTP_STATUSES.FORBIDDEN, err.message);
      return next(error);
    }
    req.user = user;
  });

  next();
};
