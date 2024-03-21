import { model, Schema } from 'mongoose';

import { Restaurant } from '@typeDefinitions/restaurant';

const restaurantSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    startingHour: { type: String, required: true },
    closingHour: { type: String, required: true },
  },
  { timestamps: true },
);

export const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);
