import { Types } from 'mongoose';

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserAccessToken = {
  userId: Types.ObjectId;
  accessToken: string;
};
