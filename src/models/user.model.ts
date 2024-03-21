import { hash } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';

import { User } from '@typeDefinitions/user';

const SALT_ROUND = 12;

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isRestaurantOwner: { type: Boolean },
    restaurant: {
      id: { type: ObjectId, ref: 'Restaurant' },
      name: { type: String },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (this, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
});

userSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

export const UserModel = model<User>('User', userSchema);
