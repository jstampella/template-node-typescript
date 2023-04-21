import { matchedData } from 'express-validator';
import { handleHttpError } from '../utils/handleError';
import { Request, Response } from 'express';
import { IUserLogin, IUserRegister } from '../interfaces/users.interfaces';
import { loginUser, registerNewUser, renewAccessToken } from '../services/auth.services';
import MiExcepcion from '../common/MiException';
import { httpResponse } from '../utils/handleResponse';

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */

const registerCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestData = matchedData(req) as IUserRegister;
    const responseUser = await registerNewUser(requestData);
    httpResponse(res, 201, { status: 'success', data: responseUser });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error.message, error.codigo);
    } else if (error instanceof Error) {
      handleHttpError(res, 'Error al registrar usuario', 500, error.message);
    }
  }
};

/**
 * Este controlador es el encargado de loguear una persona
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestData = matchedData(req) as IUserLogin;
    const responseUser = await loginUser(requestData);
    httpResponse(res, 200, { status: 'success', data: responseUser });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error.message, error.codigo);
    } else if (error instanceof Error) {
      handleHttpError(res, 'Error al loguear usuario', 500, error.message);
    }
  }
};

/**
 * Renovar accessToken a partir del refreshToken
 * @param req Request
 * @param res Response
 */
const renewCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = matchedData(req) as { token: string };
    const responseToken = await renewAccessToken(token);
    httpResponse(res, 200, { status: 'success', data: responseToken });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error.message, error.codigo);
    } else if (error instanceof Error) {
      handleHttpError(res, 'Error al renovar token', 500, error.message);
    }
  }
};

export { registerCtrl, loginCtrl, renewCtrl };
