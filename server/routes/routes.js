/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import { signUp, signIn, createRedflag, editlocation, editcomment } from '../middlewares/validation';
import userController from '../controllers/userController';
import redflagController from '../controllers/redflagController';
import token from '../middlewares/token';
import owner from '../middlewares/owner';

const route = express();
route.post('/api/v1/auth/signup', signUp, userController.signup);
route.post('/api/v1/auth/signin', signIn, userController.signin);
route.post('/api/v1/red-flags', token, createRedflag, redflagController.create);
route.get('/api/v1/red-flags', redflagController.viewredflags);
route.get('/api/v1/red-flags/:id', redflagController.viewSpecificflag);
route.delete('/api/v1/red-flags/:id', token, owner, redflagController.delete);
route.patch('/api/v1/red-flags/:id/location', token, owner, editlocation, redflagController.editLocation);
route.patch('/api/v1/red-flags/:id/comment', token, owner, editcomment, redflagController.editComment);

export default route;
