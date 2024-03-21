import { model, Schema } from 'mongoose';

import { Reservation } from '@typeDefinitions/reservation';

const reservationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, ref: 'User' },
    restaurantId: { type: String, required: true, ref: 'Restaurant' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    additionalNotes: { type: String, required: false },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const ReservationModel = model<Reservation>('Reservation', reservationSchema);
