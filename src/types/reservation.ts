export interface Reservation {
  userId: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfPeople: number;
  additionalNotes: string;
}
