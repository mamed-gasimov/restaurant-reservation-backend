import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { createUserAccessToken, findUserAccessToken, findUserById, updateUserAccessToken } from '@services/auth';

const userAccessTokenController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    if (!Types.ObjectId.isValid(userId)) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Invalid user id!');
      return next(err);
    }

    const existedUser = await findUserById(userId);
    if (!existedUser) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'User was not found!');
      return next(err);
    }

    const userAccessTokenDoc = await findUserAccessToken(existedUser._id);
    const user = { id: existedUser._id };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (!userAccessTokenDoc) {
      await createUserAccessToken(existedUser._id, accessToken);
    } else {
      await updateUserAccessToken(existedUser._id, accessToken);
    }

    res
      .status(HTTP_STATUSES.OK)
      .json({ message: 'You were successfully signed with new access token.', token: accessToken });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default userAccessTokenController;
