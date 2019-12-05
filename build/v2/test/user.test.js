'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mocha = require('mocha');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _helperToken = require('../helpers/helperToken');

var _helperToken2 = _interopRequireDefault(_helperToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
_dotenv2.default.config();

_chai2.default.use(_chaiHttp2.default);
_chai2.default.should();

var realtoken = (0, _helperToken2.default)('abdoul@gmail.com', 'user');
var faketoken = (0, _helperToken2.default)('manzi@gmail.com', 'user');
var admin = (0, _helperToken2.default)('aisha@gmail.com', 'admin');

var user = {
  firstname: 'Nuru',
  lastname: 'Abdou',
  email: 'abdoul@gmail.com',
  phonenumber: '+250785802789',
  username: 'gege',
  password: 'nurureal'
};
var user2 = {
  firstname: 'Nuru',
  lastname: 'Abdou',
  email: 'manzi@gmail.com',
  phonenumber: '+250785802789',
  username: 'gege',
  password: 'nurureal'
};
var redflag = {
  title: 'Murder',
  comment: 'Someone was killed yesterday',
  location: 'Gisenyi',
  images: 'no images',
  videos: 'no videos'
};
var redflagempty = {
  title: '',
  type: 'Red-flag',
  comment: 'Someone was smoked yesterday',
  location: 'Gisenyi',
  status: 'pending...',
  images: 'no images',
  videos: 'no videos'
};

var login = {
  email: 'abdoul@gmail.com',
  password: 'nurureal'
};
var login2 = {
  email: 'manzi@gmail.com',
  password: 'nurureal'
};
var adminlogin = {
  email: 'aisha@gmail.com',
  password: 'hello1234'
};
var usercatch = {
  password: 'nurureal'
};
var usercheck = {
  email: 'abd@gmail.com',
  password: 'nuru'
};
var userpass = {
  email: 'abdoul@gmail.com',
  password: 'nuru'
};
var updatecomment = {
  comment: 'Please do something about this'
};
var updatestatus = {
  status: 'Resolved'
};
var emptystatus = {
  status: ''
};
var emptycomment = {
  comment: ''
};
var updatelocation = {
  location: 'USA'
};
var emptylocation = {
  location: ''
};
var nouser = {};
(0, _mocha.describe)('User tests for Version 1', function () {
  (0, _mocha.it)('Not authorized', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').set('token', realtoken).send(nouser).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'Not authorized');
      done();
    });
  });
  (0, _mocha.it)('User should be able to create an account', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'User succesfully created');
      res.body.should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('Another User should be able to create an account', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signup').send(user2).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'User succesfully created');
      res.body.should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('Cannot create account if User already exists', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.have.property('error', 'User already exists');
      done();
    });
  });
  (0, _mocha.it)('User must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signin').send(login).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  (0, _mocha.it)('Another User must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signin').send(login2).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  (0, _mocha.it)('Admin must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signin').send(adminlogin).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  (0, _mocha.it)('When no email is passed', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signin').send(usercatch).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"email" is required');
      done();
    });
  });
  (0, _mocha.it)('Fiels required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signup').send(usercatch).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', 'First name must be letters only');
      done();
    });
  });
  (0, _mocha.it)('User doesnt exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signin').send(usercheck).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'User with provided email doesnt exist');
      done();
    });
  });
  (0, _mocha.it)('Incorrect Password Provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/auth/signin').send(userpass).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'Password is incorrect');
      done();
    });
  });
});
(0, _mocha.describe)('RedFlag Tests', function () {
  (0, _mocha.it)('No redflag found', function (done) {
    var id = 10;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/location').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Viewing redflag that doesnt exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v2/red-flags').send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflags not found');
      done();
    });
  });
  (0, _mocha.it)('Viewing specific redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).get('/api/v2/red-flags/' + id).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Updating the location of a redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/location').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Redflag created', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').set('token', realtoken).send(redflag)
    //   .attach(
    //     'images',
    //     `${__dirname}../../../redflags/2019_10_22_122129IMG_0395.JPG`
    //   )
    .end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'Redflag successfully created');
      done();
    });
  });
  (0, _mocha.it)('Second Redflag created', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').set('token', realtoken).send(redflag)
    //   .attach(
    //     'images',
    //     `${__dirname}../../../redflags/2019_10_22_122129IMG_0395.JPG`
    //   )
    .end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'Redflag successfully created');
      done();
    });
  });
  (0, _mocha.it)('Redflag having empty fields', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').set('token', realtoken).send(redflagempty).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"title" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Viewing all redflags', function (done) {
    _chai2.default.request(_app2.default).get('/api/v2/red-flags').send(redflag).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Success. List of all red-flags');
      done();
    });
  });
  (0, _mocha.it)('Not Owner message', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).delete('/api/v2/red-flags/' + id).set('token', faketoken).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.property('error', 'You are not the owner');
      done();
    });
  });
  (0, _mocha.it)('Not Admin message', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/status').set('token', faketoken).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.property('error', 'You are not the Admin');
      done();
    });
  });
  (0, _mocha.it)('Viewing specific redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).get('/api/v2/red-flags/' + id).send().end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  (0, _mocha.it)('Updating the comment of a redflag with empty field', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/comment').set('token', realtoken).send(emptycomment).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"comment" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Updating the comment of a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/comment').set('token', realtoken).send(updatecomment).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Updated red-flag comment');
      done();
    });
  });
  (0, _mocha.it)('Updating the status of a redflag with empty field', function (done) {
    var id = 2;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/status').set('token', admin).send(emptystatus).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"status" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Updating the status of a redflag', function (done) {
    var id = 2;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/status').set('token', admin).send(updatestatus).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Changed red-flag status');
      done();
    });
  });
  (0, _mocha.it)('Updating the location of a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/location').set('token', realtoken).send(updatelocation).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Updated red-flag location');
      done();
    });
  });
  (0, _mocha.it)('Updating the location of a redflag with empty field', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/location').set('token', realtoken).send(emptylocation).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"location" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Deleting a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).delete('/api/v2/red-flags/' + id).set('token', realtoken).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Redflag successfully deleted');
      done();
    });
  });
  (0, _mocha.it)('Deleting a redflag that doesnt exist', function (done) {
    var id = 3;
    _chai2.default.request(_app2.default).delete('/api/v2/red-flags/' + id).set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Updating the comment of a redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/comment').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Updating the status of a redflag that doesnt exist', function (done) {
    var id = 6;
    _chai2.default.request(_app2.default).patch('/api/v2/red-flags/' + id + '/status').set('token', admin).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
});
(0, _mocha.describe)('App Test', function () {
  (0, _mocha.it)('Welcome message', function (done) {
    _chai2.default.request(_app2.default).get('/').send().end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Welcome to Broadcaster');
      done();
    });
  });
  (0, _mocha.it)('Route errors', function (done) {
    _chai2.default.request(_app2.default).get('/feuf').send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Route not found');
      done();
    });
  });
});
(0, _mocha.describe)('Token Test', function () {
  (0, _mocha.it)('No token found', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').send().end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'No token found');
      done();
    });
  });
  (0, _mocha.it)('Jwt malformed token', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').set('token', 'hello').send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error');
      done();
    });
  });
  (0, _mocha.it)('Invalid Signature', function (done) {
    _chai2.default.request(_app2.default).post('/api/v2/red-flags').set('token', realtoken + 'sbvs').send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', 'invalid signature');
      done();
    });
  });
});
(0, _mocha.describe)('User tests for version 2', function () {
  (0, _mocha.it)('Not authorized', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(nouser).end(function (err, res) {
      console.log(process.env.NODE_ENV);
      res.should.have.status(401);
      res.body.should.have.property('error', 'Not authorized');
      done();
    });
  });
  (0, _mocha.it)('User should be able to create an account', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'User succesfully created');
      res.body.should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('Another User should be able to create an account', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user2).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'User succesfully created');
      res.body.should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('Cannot create account if User already exists', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.have.property('error', 'User already exists');
      done();
    });
  });
  (0, _mocha.it)('User must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(login).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  (0, _mocha.it)('Another User must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(login2).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  (0, _mocha.it)('When no email is passed', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(usercatch).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"email" is required');
      done();
    });
  });
  (0, _mocha.it)('Fiels required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(usercatch).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"firstname" is required');
      done();
    });
  });
  (0, _mocha.it)('User doesnt exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(usercheck).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'User with provided email doesnt exist');
      done();
    });
  });
  (0, _mocha.it)('Incorrect Password Provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(userpass).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'Password is incorrect');
      done();
    });
  });
});
(0, _mocha.describe)('RedFlag Tests', function () {
  (0, _mocha.it)('No redflag found', function (done) {
    var id = 10;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Viewing redflag that doesnt exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/red-flags').send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflags not found');
      done();
    });
  });
  (0, _mocha.it)('Viewing specific redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).get('/api/v1/red-flags/' + id).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Updating the location of a redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Redflag created', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(redflag)
    //   .attach(
    //     'images',
    //     `${__dirname}../../../redflags/2019_10_22_122129IMG_0395.JPG`
    //   )
    .end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'Redflag successfully created');
      done();
    });
  });
  (0, _mocha.it)('Second Redflag created', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(redflag)
    //   .attach(
    //     'images',
    //     `${__dirname}../../../redflags/2019_10_22_122129IMG_0395.JPG`
    //   )
    .end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'Redflag successfully created');
      done();
    });
  });
  (0, _mocha.it)('Redflag having empty fields', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(redflagempty).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"title" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Viewing all redflags', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/red-flags').send(redflag).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Success. List of all red-flags');
      done();
    });
  });
  (0, _mocha.it)('Not Owner message', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).delete('/api/v1/red-flags/' + id).set('token', faketoken).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.property('error', 'You are not the owner');
      done();
    });
  });
  (0, _mocha.it)('Viewing specific redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).get('/api/v1/red-flags/' + id).send().end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  (0, _mocha.it)('Updating the comment of a redflag with empty field', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/comment').set('token', realtoken).send(emptycomment).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"comment" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Updating the comment of a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/comment').set('token', realtoken).send(updatecomment).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Updated red-flag comment');
      done();
    });
  });
  (0, _mocha.it)('Updating the location of a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send(updatelocation).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Updated red-flag location');
      done();
    });
  });
  (0, _mocha.it)('Updating the location of a redflag with empty field', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send(emptylocation).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"location" is not allowed to be empty');
      done();
    });
  });
  (0, _mocha.it)('Deleting a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).delete('/api/v1/red-flags/' + id).set('token', realtoken).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Redflag successfully deleted');
      done();
    });
  });
  (0, _mocha.it)('Deleting a redflag that doesnt exist', function (done) {
    var id = 3;
    _chai2.default.request(_app2.default).delete('/api/v1/red-flags/' + id).set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  (0, _mocha.it)('Updating the comment of a redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/comment').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
});
(0, _mocha.describe)('App Test', function () {
  (0, _mocha.it)('Welcome message', function (done) {
    _chai2.default.request(_app2.default).get('/').send().end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Welcome to Broadcaster');
      done();
    });
  });
});
(0, _mocha.describe)('Token Test', function () {
  (0, _mocha.it)('No token found', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').send().end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'No token found');
      done();
    });
  });
  (0, _mocha.it)('Jwt malformed token', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', 'hello').send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', 'jwt malformed');
      done();
    });
  });
  (0, _mocha.it)('Invalid Signature', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken + 'sbvs').send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', 'invalid signature');
      done();
    });
  });
});