import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { getRestaurantById } from '@services/restaurant';

const getSingleRestaurantController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId || !Types.ObjectId.isValid(restaurantId)) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'Restaurant id is not valid!');
      return next(error);
    }

    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'Restaurant was not found!');
      return next(error);
    }
    res.status(HTTP_STATUSES.OK).json({ restaurant });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default getSingleRestaurantController;
