import { Router } from 'express';

import { MyRouter } from '../interfaces/route.interfaces';
import { loginCtrl, registerCtrl } from '../controllers/auth';
import { validatorLogin, validatorRegister } from '../validators/auth';
const router = Router();

router.post('/register', validatorRegister, registerCtrl);

router.post('/login', validatorLogin, loginCtrl);

const myRouter: MyRouter = {
  router,
};

export default myRouter;
