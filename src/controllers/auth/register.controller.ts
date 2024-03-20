import { NextFunction, Response } from 'express';

import { ExtendedRequest } from '@typeDefinitions/express';
import { createUser, findUserByEmail } from '@services/auth';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { CustomError } from '@middlewares/errorHandler';

const registerController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const existedUser = await findUserByEmail(req.body.email);
    if (existedUser) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).json({ message: 'User already exists!' });
    }

    await createUser(req.body);
    res.status(HTTP_STATUSES.CREATED).json({ message: 'User was successfully created!' });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    next(error);
  }
};

export default registerController;
