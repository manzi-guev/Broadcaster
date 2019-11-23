/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import { signUp, signIn } from '../middlewares/validation.middleware';
import userController from '../controllers/userController';
import redflagController from '../controllers/redflagController';

const route = express();
route.post('/api/v1/auth/signup', signUp, userController.signup);
route.post('/api/v1/auth/signin', signIn, userController.signin);
route.get('/api/v1/red-flags', redflagController.viewredflags);

export default route;
