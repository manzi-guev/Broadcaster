/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import {
  signUp,
  signIn,
  createRedflag,
  editlocation,
  editcomment,
  editStatus
} from '../middleware/validation';
import userController from '../controllers/userController';
import redflagController from '../controllers/redflagController';
import token from '../middleware/token';
import owner from '../middleware/owner';
import isAdmin from '../middleware/isadmin';

const route = express();

route.post('/api/v2/auth/signup', signUp, userController.signup);
route.post('/api/v2/auth/signin', signIn, userController.signin);
route.post('/api/v2/red-flags', token, createRedflag, redflagController.create);
route.get('/api/v2/red-flags', redflagController.viewredflags);
route.get('/api/v2/red-flags/:id', redflagController.viewSpecificflag);
route.delete('/api/v2/red-flags/:id', token, owner, redflagController.delete);
route.patch(
  '/api/v2/red-flags/:id/location',
  token,
  owner,
  editlocation,
  redflagController.editLocation
);
route.patch(
  '/api/v2/red-flags/:id/comment',
  token,
  owner,
  editcomment,
  redflagController.editComment
);
route.patch(
  '/api/v2/red-flags/:id/status',
  isAdmin,
  editStatus,
  redflagController.editStatus
);

export default route;
