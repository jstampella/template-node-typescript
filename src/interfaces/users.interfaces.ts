import { ObjectId } from 'mongoose';

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

export interface IUsers {
  _id: ObjectId;
  name: string;
  age?: number;
  email: string;
  role: Array<Roles>;
  password: string;
}
export type IUserRegister = Omit<IUsers, 'age' | 'role' | '_id'>;

export type IUserLogin = Omit<IUsers, 'age' | 'role' | '_id' | 'name'>;
