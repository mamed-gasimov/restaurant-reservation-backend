import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { createUserAccessToken, findUserAccessToken, findUserByEmail, updateUserAccessToken } from '@services/auth';
import { User } from '@typeDefinitions/user';

const loginController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existedUser = await findUserByEmail(email);
    if (!existedUser) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Invalid credentials!');
      return next(err);
    }

    const passwordMatch = await bcrypt.compare(password, existedUser.password);
    if (!passwordMatch) {
      const err = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Invalid credentials!');
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

    const info = existedUser as unknown as { _doc: User };
    const userInfo = { ...info._doc };
    delete userInfo.password;
    res
      .status(HTTP_STATUSES.OK)
      .json({ message: 'You were successfully logged in.', token: accessToken, user: userInfo });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default loginController;
