import { Response } from 'express';
import logger from '../config/winston';
import { httpResponse } from './handleResponse';

const handleHttpError = (res: Response, message = 'Algo sucedio', code = 403, extra = ''): void => {
  logger.error(`${message} | extra: ${extra} | code:${code}`);
  httpResponse(res, code, { status: 'error', message });
};

export { handleHttpError };
