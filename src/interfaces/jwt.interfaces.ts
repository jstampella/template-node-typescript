import { IUsers } from './users.interfaces';

export interface AccessTokenPayload {
  name: IUsers['name'];
  email: IUsers['email'];
  role: IUsers['role'];
}

export interface AccessTokenData extends AccessTokenPayload {
  iat: number;
  exp: number;
}

export interface RefreshTokenPAyload {
  _id: IUsers['_id'];
}

export interface RefreshTokenData extends RefreshTokenPAyload {
  iat: number;
  exp: number;
}
