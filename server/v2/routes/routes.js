/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import {
  signUp,
  signIn,
  createRedflag
} from '../middleware/validation.middleware';
import userController from '../controllers/userController';
import redflagController from '../controllers/redflagController';
import token from '../middleware/token.middleware';

const route = express();

route.post('/api/v2/auth/signup', signUp, userController.signup);
route.post('/api/v2/auth/signin', signIn, userController.signin);
route.post('/api/v2/red-flags', token, createRedflag, redflagController.create);
route.get('/api/v2/red-flags', redflagController.viewredflags);
route.get('/api/v2/red-flags/:id', redflagController.viewSpecificflag);
export default route;
