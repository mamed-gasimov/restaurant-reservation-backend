import { NextFunction, Response } from 'express';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';

const getRestaurantsController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    console.log('get restaurants!');
    res.json({ data: [], message: 'GOOD!' });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default getRestaurantsController;
