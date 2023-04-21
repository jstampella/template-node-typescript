import jwt from 'jsonwebtoken';
import { AccessTokenData, AccessTokenPayload, RefreshTokenData, RefreshTokenPAyload } from '../interfaces/jwt.interfaces';
import MiExcepcion from '../common/MiException';
const JWT_SECRET = process.env.JWT_SECRET as string;

// Genera un access token
const generateAccessToken = (user: AccessTokenPayload): string => {
  const payload: AccessTokenData = {
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // expira en 1 hora
  };
  return jwt.sign(payload, JWT_SECRET);
};

// Genera un refresh token
const generateRefreshToken = (user: RefreshTokenPAyload): string => {
  const payload: RefreshTokenData = {
    _id: user._id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // expira en 7 días
  };
  return jwt.sign(payload, JWT_SECRET);
};

// Decodifica un access token
const decodeAccessToken = (token: string): AccessTokenData => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AccessTokenData;
    return decoded;
  } catch (err) {
    throw new Error('Token inválido');
  }
};
/**
 *
 * @param token debe ingresar un string
 * @returns un objeto RefreshTokenData
 */
// Decodifica un refresh token
const decodeRefreshToken = (token: string): RefreshTokenData => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as RefreshTokenData;
    return decoded;
  } catch (err) {
    throw new MiExcepcion('Token inválido', 400);
  }
};

export { generateAccessToken, generateRefreshToken, decodeAccessToken, decodeRefreshToken };
