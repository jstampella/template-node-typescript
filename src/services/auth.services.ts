import { IUserLogin, IUserRegister, IUsers } from '../interfaces/users.interfaces';
import { UsersModel } from '../models';
import MiExcepcion from '../common/MiException';
import { tokenSign } from '../utils/handleJwt';
import { compare, encrypt } from '../utils/handlePassword';

const registerNewUser = async ({ email, password, name }: IUserRegister) => {
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
  const data = {
    token: await tokenSign(dataUser.toJSON() as IUsers),
    user: dataUser,
  };
  return data;
};

const loginUser = async ({ email, password }: IUserLogin) => {
  const checkIs = await UsersModel.findOne({ email });
  if (!checkIs) throw new MiExcepcion('NOT_FOUND_USER', 404);

  const passwordHash = checkIs.password as string; //TODO el encriptado!
  const isCorrect = await compare(password, passwordHash);

  if (!isCorrect) throw new MiExcepcion('PASSWORD_INCORRECT', 404);

  const token = await tokenSign(checkIs.toJSON() as IUsers);
  const user = { name: checkIs.name, age: checkIs.age, email: checkIs.email, role: checkIs.role };
  const data = {
    token,
    user,
  };
  return data;
};

export { registerNewUser, loginUser };
