import { NextFunction, Request, Response } from 'express';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('login controller');
  } catch (err) {
    next(err);
  }
};

export default loginController;
