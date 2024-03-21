import { model, Schema } from 'mongoose';

import { UserAccessToken } from '@typeDefinitions/user';

const userAccessTokenSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, ref: 'User' },
    accessToken: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserAccessTokenModel = model<UserAccessToken>('UserAccessToken', userAccessTokenSchema);
