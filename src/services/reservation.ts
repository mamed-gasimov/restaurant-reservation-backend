import { ReservationModel } from '@models/reservation.model';
import { Reservation } from '@typeDefinitions/reservation';

export const createReservation = async (reservation: Reservation) => {
  return ReservationModel.create(reservation);
};
