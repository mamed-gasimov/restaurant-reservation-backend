import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { findUserById } from '@services/auth';
import { RestaurantOwnerUser } from '@typeDefinitions/user';

const getCurrentUserController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user as unknown as { id: string };
    let userId: Types.ObjectId;
    if (user) userId = user.id as unknown as Types.ObjectId;

    if (!Types.ObjectId.isValid(userId)) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Invalid user id!');
      return next(err);
    }

    const existedUser = (await findUserById(userId)) as unknown as { _doc: RestaurantOwnerUser };
    if (!existedUser) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'User was not found!');
      return next(err);
    }

    const userInfo = { ...existedUser._doc };
    delete userInfo.password;

    res.status(HTTP_STATUSES.OK).json({ message: 'User info was successfully found.', user: userInfo });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default getCurrentUserController;
