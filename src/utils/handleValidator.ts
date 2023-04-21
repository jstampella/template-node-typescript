import { NextFunction, Request, Response } from 'express';
import { validationResult as validate } from 'express-validator';

const validateResults = (req: Request, res: Response, next: NextFunction) => {
  const errors = validate(req);

  if (errors.isEmpty()) {
    return next();
  }

  const err = {
    errors: errors.array(),
  };

  return res.status(403).json(err);
};

export { validateResults };
