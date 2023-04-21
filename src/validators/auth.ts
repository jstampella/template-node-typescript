import { check } from 'express-validator';
import { validateResults } from '../utils/handleValidator';
import { Request } from 'express-serve-static-core';
import { NextFunction, Response } from 'express';

const validatorRegister = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('age').exists().notEmpty().isNumeric(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];

const validatorToken = [
  check('token').exists().notEmpty().withMessage('token necesario'),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check('password')
    .exists()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 3, max: 15 })
    .withMessage('Password must be between 3 and 15 characters'),
  check('email').exists().notEmpty().isEmail().withMessage('Email is invalid'),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];

export { validatorRegister, validatorLogin, validatorToken };
