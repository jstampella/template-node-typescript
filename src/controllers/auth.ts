import { matchedData } from 'express-validator';
import { handleHttpError } from '../utils/handleError';
import { Request, Response } from 'express';
import { IUserLogin, IUserRegister } from '../interfaces/users.interfaces';
import { loginUser, registerNewUser } from '../services/auth.services';
import MiExcepcion from '../common/MiException';

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */

const registerCtrl = async (req: Request, res: Response) => {
  try {
    const requestData = matchedData(req) as IUserRegister;
    const responseUser = await registerNewUser(requestData);
    res.status(201).send({ responseUser });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error.message, error.codigo);
    } else if (error instanceof Error) {
      handleHttpError(res, 'error al registrar usuario', 500, error.message);
    }
  }
};

/**
 * Este controlador es el encargado de loguear una persona
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req: Request, res: Response) => {
  try {
    const requestData = matchedData(req) as IUserLogin;
    const responseUser = await loginUser(requestData);
    res.status(200).send(responseUser);
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error.message, error.codigo);
    } else if (error instanceof Error) {
      handleHttpError(res, 'Error al loguear usuario', 500, error.message);
    }
  }
};

export { registerCtrl, loginCtrl };
