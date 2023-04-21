// src/middleware/not-found.middleware.ts

import { Request, Response } from 'express';

export const notFoundHandler = (_request: Request, response: Response): void => {
  const message = 'Resource not found';

  response.status(404).send(message);
};
