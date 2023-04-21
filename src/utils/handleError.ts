import { Response } from 'express';
import logger from '../config/winston';

const handleHttpError = (res: Response, message = 'Algo sucedio', code = 403, extra = '') => {
  logger.error(`${message} | extra: ${extra} | code:${code}`);
  res.status(code).send({ error: message });
};

export { handleHttpError };
