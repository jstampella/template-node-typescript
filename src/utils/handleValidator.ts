import { NextFunction, Request, Response } from 'express';
import { validationResult as validate } from 'express-validator';

const validateResults = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validate(req);

  if (errors.isEmpty()) {
    return next();
  }

  const err = {
    errors: errors.mapped(),
  };

  res.status(403).json(err);
};

export { validateResults };
