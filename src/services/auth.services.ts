import { IUserLogin, IUserPayload, IUserRegister, IUsers, LoginPayload, RegisterPayload, tokenPayload } from '../interfaces/users.interfaces';
import { UsersModel } from '../models';
import MiExcepcion from '../common/MiException';
import { compare, encrypt } from '../utils/handlePassword';
import { decodeRefreshToken, generateAccessToken, generateRefreshToken } from '../utils/handleJwt';
import { AccessTokenData, RefreshTokenData, RefreshTokenPAyload } from 'interfaces/jwt.interfaces';

const registerNewUser = async ({ email, password, name }: IUserRegister): Promise<RegisterPayload> => {
  const checkIs = await UsersModel.findOne({ email });
  if (checkIs) throw new MiExcepcion('El mail ya se encuentra registrado', 401);
  const passHash = await encrypt(password);

  const body: IUserRegister = {
    email,
    password: passHash,
    name,
  };

  const dataUser = await UsersModel.create(body);
  dataUser.set('password', undefined, { strict: false });
  const data: RegisterPayload = {
    token: generateAccessToken(dataUser.toJSON() as IUsers),
    user: dataUser.toJSON() as IUserPayload,
  };
  return data;
};

const loginUser = async ({ email, password }: IUserLogin): Promise<LoginPayload> => {
  const checkIs = await UsersModel.findOne({ email });
  if (!checkIs) throw new MiExcepcion('NOT_FOUND_USER', 404);

  const passwordHash = checkIs.password as string; //TODO el encriptado!
  const isCorrect = await compare(password, passwordHash);

  if (!isCorrect) throw new MiExcepcion('PASSWORD_INCORRECT', 404);

  const accessToken = generateAccessToken(checkIs.toJSON() as IUsers);
  const refreshToken = generateRefreshToken(checkIs as RefreshTokenPAyload);
  const user = { name: checkIs.name, age: checkIs.age, email: checkIs.email, role: checkIs.role };
  const data: LoginPayload = {
    accessToken,
    refreshToken,
    user: user as IUserPayload,
  };
  return data;
};

const findIdUser = async (id: string): Promise<IUserPayload> => {
  const checkIs = await UsersModel.findById(id);
  if (!checkIs) throw new MiExcepcion('NOT_FOUND_USER', 404);
  const user: IUserPayload = checkIs.toJSON() as IUserPayload;
  return user;
};

// Actualiza el access token utilizando un refresh token
const renewAccessToken = async (refreshToken: string): Promise<tokenPayload> => {
  const refreshTokenData = decodeRefreshToken(refreshToken);
  const usuarioId = refreshTokenData._id;
  // Aquí deberías verificar que el usuarioId existe en tu base de datos y que el refresh token es válido
  if (!usuarioId) throw new MiExcepcion('Token incorrecto!', 401);
  const userData = await findIdUser(usuarioId.toString());
  if (!userData) throw new MiExcepcion('Error al validar token!', 403);
  const accessToken = generateAccessToken(userData as AccessTokenData);
  const newRefreshToken = generateRefreshToken(userData as RefreshTokenData);
  const responseData: tokenPayload = {
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  };
  return responseData;
};

export { registerNewUser, loginUser, findIdUser, renewAccessToken };
