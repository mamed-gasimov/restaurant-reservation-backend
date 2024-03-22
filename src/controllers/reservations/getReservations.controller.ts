import { NextFunction, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { getReservationsByRestaurantId } from '@services/reservation';
import { findUserById } from '@services/auth';
import { getRestaurantById } from '@services/restaurant';
import { RestaurantOwnerUser } from '@typeDefinitions/user';
import { Reservation } from '@typeDefinitions/reservation';

const getReservationsController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;

    if (!Types.ObjectId.isValid(restaurantId)) {
      const error = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Id must be valid!');
      return next(error);
    }

    const userId = req.user as unknown as { id: string };
    const user = (await findUserById(new ObjectId(userId.id))) as RestaurantOwnerUser;
    if (!user) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'User was not found!');
      return next(error);
    }

    const id = user?.restaurant?.id;
    if (id && id?.toString() !== restaurantId) {
      const error = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'You are not the owner of this restaurant!');
      return next(error);
    }

    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'Restaurant was not found!');
      return next(error);
    }

    const reservationsByRestaurantId = (await getReservationsByRestaurantId(restaurantId)) as unknown as {
      _doc: Reservation;
    }[];
    const list = [];
    if (reservationsByRestaurantId && reservationsByRestaurantId.length) {
      for (const res of reservationsByRestaurantId) {
        const foundUser = await findUserById(res._doc.userId as unknown as Types.ObjectId);
        if (foundUser) {
          list.push({
            ...res._doc,
            userFullName: `${foundUser.firstName} ${foundUser.lastName}`,
            userEmail: foundUser.email,
          });
        }
      }
    }

    res.status(HTTP_STATUSES.OK).json({ message: 'List of reservations.', reservations: list });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default getReservationsController;
