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

export interface IUserPayload {
  _id?: IUsers['_id'];
  name?: IUsers['name'];
  age?: IUsers['age'];
  email?: IUsers['email'];
  role?: IUsers['role'];
}

export type IUserRegister = Omit<IUsers, 'age' | 'role' | '_id'>;

export type IUserLogin = Omit<IUsers, 'age' | 'role' | '_id' | 'name'>;

export interface RegisterPayload {
  token: string;
  user: IUserPayload;
}

export interface tokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload extends tokenPayload {
  user: IUserPayload;
}
