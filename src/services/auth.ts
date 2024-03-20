import { UserModel } from '@models/user.model';
import { User } from '@typeDefinitions/user';

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email: email?.toLowerCase() });
};

export const createUser = async (user: User) => {
  return UserModel.create(user);
};
