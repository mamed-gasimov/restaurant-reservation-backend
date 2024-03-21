import { ReservationModel } from '@models/reservation.model';
import { Reservation } from '@typeDefinitions/reservation';

export const createReservation = async (reservation: Reservation) => {
  return ReservationModel.create(reservation);
};

export const getReservationById = async (reservationId: string) => {
  return ReservationModel.findById(reservationId);
};

export const updateReservation = async (reservationId: string, status: 'approved' | 'rejected') => {
  return ReservationModel.findOneAndUpdate({ _id: reservationId }, { status });
};
