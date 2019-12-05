'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _helperToken = require('../helpers/helperToken');

var _helperToken2 = _interopRequireDefault(_helperToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable node/no-unsupported-features/es-syntax */
_chai2.default.use(_chaiHttp2.default);
_chai2.default.should();

var realtoken = (0, _helperToken2.default)('abdoul@gmail.com');
var faketoken = (0, _helperToken2.default)('manzi@gmail.com');

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
var login = {
  email: 'abdoul@gmail.com',
  password: 'nurureal'
};
var login2 = {
  email: 'manzi@gmail.com',
  password: 'nurureal'
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
var nouser = {};
var redflag = {
  title: 'Murder',
  type: 'Red-flag',
  comment: 'Someone was killed yesterday',
  location: 'Gisenyi',
  status: 'pending...',
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
var updatelocation = {
  location: 'USA'
};
var emptylocation = {
  location: ''
};
var updatecomment = {
  comment: 'Please do something about this'
};
var emptycomment = {
  comment: ''
};

describe('User tests', function () {
  it('Not authorized', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(nouser).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'Not authorized');
      done();
    });
  });
  it('User should be able to create an account', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'User succesfully created');
      res.body.should.have.property('token');
      done();
    });
  });
  it('Another User should be able to create an account', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user2).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'User succesfully created');
      res.body.should.have.property('token');
      done();
    });
  });
  it('Cannot create account if User already exists', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.have.property('error', 'User already exists');
      done();
    });
  });
  it('User must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(login).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  it('Another User must be able to login', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(login2).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'User successfully logged in');
      done();
    });
  });
  it('When no email is passed', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(usercatch).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"email" is required');
      done();
    });
  });
  it('Fiels required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(usercatch).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"firstname" is required');
      done();
    });
  });
  it('User doesnt exist', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(usercheck).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'User with provided email doesnt exist');
      done();
    });
  });
  it('Incorrect Password Provided', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(userpass).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'Password is incorrect');
      done();
    });
  });
});
describe('App Test', function () {
  it('Welcome message', function (done) {
    _chai2.default.request(_app2.default).get('/').send().end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Welcome to Broadcaster');
      done();
    });
  });
  it('Route not found', function (done) {
    _chai2.default.request(_app2.default).get('/djdvbjkb').send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Route not found');
      done();
    });
  });
});
describe('RedFlag Tests', function () {
  it('No redflag found', function (done) {
    var id = 10;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  it('Viewing all redflags when they doesnt exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/red-flags').send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflags not found');
      done();
    });
  });
  it('Viewing specific redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).get('/api/v1/red-flags/' + id).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  it('Updating the location of a redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  it('Redflag created', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(redflag).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'Redflag successfully created');
      done();
    });
  });
  it(' Second Redflag created', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(redflag).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('message', 'Redflag successfully created');
      done();
    });
  });
  it('Redflag having empty fields', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken).send(redflagempty).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"title" is not allowed to be empty');
      done();
    });
  });
  it('Viewing all redflags', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/red-flags').send(redflag).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Success. List of all red-flags');
      done();
    });
  });
  it('Not Owner message', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).delete('/api/v1/red-flags/' + id).set('token', faketoken).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.have.property('error', 'You are not the owner');
      done();
    });
  });
  it('Viewing specific redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).get('/api/v1/red-flags/' + id).send().end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('Updating the comment of a redflag with empty field', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/comment').set('token', realtoken).send(emptycomment).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"comment" is not allowed to be empty');
      done();
    });
  });
  it('Updating the comment of a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/comment').set('token', realtoken).send(updatecomment).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Updated red-flag comment');
      done();
    });
  });
  it('Updating the location of a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send(updatelocation).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Updated red-flag location');
      done();
    });
  });
  it('Updating the location of a redflag with empty field', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/location').set('token', realtoken).send(emptylocation).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', '"location" is not allowed to be empty');
      done();
    });
  });
  it('Deleting a redflag', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).delete('/api/v1/red-flags/' + id).set('token', realtoken).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('message', 'Redflag successfully deleted');
      done();
    });
  });
  it('Deleting a redflag that doesnt exist', function (done) {
    var id = 3;
    _chai2.default.request(_app2.default).delete('/api/v1/red-flags/' + id).set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
  it('Updating the comment of a redflag that doesnt exist', function (done) {
    var id = 1;
    _chai2.default.request(_app2.default).patch('/api/v1/red-flags/' + id + '/comment').set('token', realtoken).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('error', 'Redflag not found');
      done();
    });
  });
});
describe('Token Test', function () {
  it('No token found', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').send().end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error', 'No token found');
      done();
    });
  });
  it('Jwt malformed token', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', 'hello').send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', 'jwt malformed');
      done();
    });
  });
  it('Invalid Signature', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/red-flags').set('token', realtoken + 'sbvs').send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error', 'invalid signature');
      done();
    });
  });
});