import { NextFunction, Request, Response } from 'express';

const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('reg');
    res.json();
  } catch (err) {
    next(err);
  }
};

export default registerController;
