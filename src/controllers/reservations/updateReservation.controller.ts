import { NextFunction, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

import { ExtendedRequest } from '@typeDefinitions/express';
import { CustomError } from '@middlewares/errorHandler';
import { HTTP_STATUSES } from '@typeDefinitions/general';
import { getReservationById, updateReservation } from '@services/reservation';
import { findUserById } from '@services/auth';
import { RestaurantOwnerUser } from '@typeDefinitions/user';

const updateReservationController = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const { reservationId, status } = req.body;

    if (!Types.ObjectId.isValid(reservationId)) {
      const error = new CustomError(HTTP_STATUSES.BAD_REQUEST, 'Id must be valid!');
      return next(error);
    }

    const reservation = await getReservationById(reservationId);
    if (!reservation) {
      const error = new CustomError(HTTP_STATUSES.NOT_FOUND, 'Reservation was not found!');
      return next(error);
    }

    const currentUser = (await findUserById(new ObjectId(req.user))) as RestaurantOwnerUser;
    if (currentUser?.restaurant?.id?.toString() !== reservation.restaurantId) {
      const error = new CustomError(
        HTTP_STATUSES.FORBIDDEN,
        'Only current restaurant owner can approve or reject reservations!',
      );
      return next(error);
    }

    await updateReservation(reservationId, status);
    res.status(HTTP_STATUSES.OK).json({ message: 'Reservation was successfully updated!' });
  } catch (err) {
    const error = new CustomError(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    console.log(err);

    next(error);
  }
};

export default updateReservationController;
