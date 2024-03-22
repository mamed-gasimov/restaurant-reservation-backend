import { Types } from 'mongoose';

import { UserModel } from '@models/user.model';
import { User } from '@typeDefinitions/user';
import { UserAccessTokenModel } from '@models/userAccessToken.model';

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email: email?.toLowerCase() });
};

export const findUserById = async (id: Types.ObjectId) => {
  return UserModel.findOne({ _id: id }).exec();
};

export const createUser = async (user: User) => {
  return UserModel.create(user);
};

export const findUserAccessToken = async (userId: Types.ObjectId) => {
  return UserAccessTokenModel.findOne({ userId });
};

export const createUserAccessToken = async (userId: Types.ObjectId, accessToken: string) => {
  return UserAccessTokenModel.create({ userId, accessToken });
};

export const updateUserAccessToken = async (userId: Types.ObjectId, accessToken: string) => {
  return UserAccessTokenModel.findOneAndUpdate({ userId }, { accessToken });
};
