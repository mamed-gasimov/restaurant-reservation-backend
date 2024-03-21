import { RestaurantModel } from '@models/restaurant.model';
import { Restaurant } from '@typeDefinitions/restaurant';

export const createRestaurant = async (restaurant: Restaurant) => {
  return RestaurantModel.create(restaurant);
};

export const getRestaurants = async (search = '') => {
  const regex = new RegExp(search, 'i');
  return RestaurantModel.find({ name: regex });
};

export const getRestaurantById = async (id: string) => {
  return RestaurantModel.findOne({ _id: id });
};
