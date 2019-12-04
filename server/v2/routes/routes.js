/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import { signUp, signIn } from '../middleware/validation.middleware';
import userController from '../controllers/userController';

const route = express();

route.post('/api/v2/auth/signup', signUp, userController.signup);
route.post('/api/v2/auth/signin', signIn, userController.signin);
export default route;
