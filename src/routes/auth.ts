import { Router } from 'express';

import { MyRouter } from '../interfaces/route.interfaces';
import { loginCtrl, registerCtrl, renewCtrl } from '../controllers/auth';
import { validatorLogin, validatorRegister, validatorToken } from '../validators/auth';
const router = Router();

router.post('/register', validatorRegister, registerCtrl);

router.post('/login', validatorLogin, loginCtrl);

router.post('/renew', validatorToken, renewCtrl);

const myRouter: MyRouter = {
  router,
};

export default myRouter;
