import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { findUserByEmail } from '@services/auth';

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

    const user = { id: existedUser._id };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('api-token', accessToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(HTTP_STATUSES.OK).json({ message: 'You successfully logged in.' });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default loginController;
