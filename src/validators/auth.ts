import { check } from 'express-validator';
import { validateResults } from '../utils/handleValidator';
import { Request } from 'express-serve-static-core';
import { NextFunction, Response } from 'express';

const validatorRegister = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('age').exists().notEmpty().isNumeric(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
const validatorLogin = [
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];

export { validatorRegister, validatorLogin };
