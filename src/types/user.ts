import { Types } from 'mongoose';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RestaurantOwnerUser extends User {
  isRestaurantOwner?: boolean;
  restaurant?: {
    id: string;
    name: string;
  };
}

export type UserAccessToken = {
  userId: Types.ObjectId;
  accessToken: string;
};
