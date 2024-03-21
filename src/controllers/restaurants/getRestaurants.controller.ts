import { NextFunction, Response } from 'express';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { getRestaurants } from '@services/restaurant';

const getRestaurantsController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;
    let restaurants;
    if (name && name?.toString().trim()) {
      restaurants = await getRestaurants(name?.toString());
    } else if (!name) {
      restaurants = await getRestaurants();
    }
    res.status(HTTP_STATUSES.OK).json({ restaurants });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default getRestaurantsController;
