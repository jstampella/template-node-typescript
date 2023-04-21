import jwt from 'jsonwebtoken';
import { IUsers } from '../interfaces/users.interfaces';
const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

/**
 * Debes de pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = async (user: IUsers) => {
  console.log(user);
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  return sign;
};

/**
 * debe de pasar el token de sesion el JWT
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt: string) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { tokenSign, verifyToken };
