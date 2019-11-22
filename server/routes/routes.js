/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import signUp from '../middlewares/validation.middleware';
import userController from '../controllers/userController';

const route = express();
route.post('/api/v1/auth/signup', signUp, userController.signup);

export default route;
