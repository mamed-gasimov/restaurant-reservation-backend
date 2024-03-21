import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { createReservation } from '@services/reservation';
import { findUserById } from '@services/auth';
import { getRestaurantById } from '@services/restaurant';
import { RestaurantOwnerUser } from '@typeDefinitions/user';

const createReservationController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { userId, restaurantId } = req.body;

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(restaurantId)) {
      const error = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Id must be valid!');
      return next(error);
    }

    const user = (await findUserById(userId)) as RestaurantOwnerUser;
    if (!user) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'User was not found!');
      return next(error);
    }

    const id = user?.restaurant?.id;
    if (id && id?.toString() === restaurantId) {
      const error = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'You are the owner');
      return next(error);
    }

    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'Restaurant was not found!');
      return next(error);
    }

    const data = { ...req.body, status: 'pending' };
    const reservation = await createReservation(data);
    res.status(HTTP_STATUSES.OK).json({ message: 'Reservation was successfully created!', reservation });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default createReservationController;
