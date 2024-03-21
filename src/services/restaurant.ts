import { RestaurantModel } from '@models/restaurant.model';
import { Restaurant } from '@typeDefinitions/restaurant';

export const createRestaurant = async (restaurant: Restaurant) => {
  return RestaurantModel.create(restaurant);
};
