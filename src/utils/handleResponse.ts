/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ApiResponse } from '../interfaces/http.interfaces';

/**
 *
 * @param res Response
 * @param code codigo de la respuesta
 * @param status estado de la respuesta 'error' 'success'
 * @param message mensaje de la respuesta
 * @param data dato de la respuesta
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const httpResponse = (res: Response, code: number, { status, data, message }: ApiResponse): void => {
  const response: ApiResponse = {
    status: status,
    message: message,
    data: data,
  };
  res.status(code).json(response);
};

export { httpResponse };
