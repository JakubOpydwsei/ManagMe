import { Schema, model } from 'mongoose';

export type UserRole = 'admin' | 'devops' | 'developer' | 'guest';

export interface IUser {
  login: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  role: { type: String, enum: ['admin', 'devops', 'developer', 'guest'], required: true }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);