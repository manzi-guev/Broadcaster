/* eslint-disable node/no-unsupported-features/es-syntax */
import chai from 'chai';
import http from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../app';
import gentoken from '../helpers/token.helper';

dotenv.config();

chai.use(http);
chai.should();

const realtoken = gentoken('abdoul@gmail.com');
const faketoken = gentoken('manzi@gmail.com');

const user = {
  firstname: 'Nuru',
  lastname: 'Abdou',
  email: 'abdoul@gmail.com',
  phonenumber: '+250785802789',
  username: 'gege',
  password: 'nurureal'
};
const user2 = {
  firstname: 'Nuru',
  lastname: 'Abdou',
  email: 'manzi@gmail.com',
  phonenumber: '+250785802789',
  username: 'gege',
  password: 'nurureal'
};
const redflag = {
  title: 'Murder',
  comment: 'Someone was killed yesterday',
  location: 'Gisenyi',
  images: 'no images',
  videos: 'no videos'
};
const redflagempty = {
  title: '',
  type: 'Red-flag',
  comment: 'Someone was smoked yesterday',
  location: 'Gisenyi',
  status: 'pending...',
  images: 'no images',
  videos: 'no videos'
};

const login = {
  email: 'abdoul@gmail.com',
  password: 'nurureal'
};
const login2 = {
  email: 'manzi@gmail.com',
  password: 'nurureal'
};
const usercatch = {
  password: 'nurureal'
};
const usercheck = {
  email: 'abd@gmail.com',
  password: 'nuru'
};
const userpass = {
  email: 'abdoul@gmail.com',
  password: 'nuru'
};
const updatecomment = {
  comment: 'Please do something about this'
};
const emptycomment = {
  comment: ''
};
const updatelocation = {
  location: 'USA'
};
const emptylocation = {
  location: ''
};
const nouser = {};
describe('User tests', () => {
  it('User should be able to create an account', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'User succesfully created');
        res.body.should.have.property('token');
        done();
      });
  });
  it('Another User should be able to create an account', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'User succesfully created');
        res.body.should.have.property('token');
        done();
      });
  });
  it('Cannot create account if User already exists', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('error', 'User already exists');
        done();
      });
  });
});
describe('User tests', () => {
  it('Not authorized', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set('token', realtoken)
      .send(nouser)
      .end((err, res) => {
        console.log(process.env.NODE_ENV);
        res.should.have.status(401);
        res.body.should.have.property('error', 'Not authorized');
        done();
      });
  });
  it('User should be able to create an account', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'User succesfully created');
        res.body.should.have.property('token');
        done();
      });
  });
  it('Another User should be able to create an account', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'User succesfully created');
        res.body.should.have.property('token');
        done();
      });
  });
  it('Cannot create account if User already exists', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('error', 'User already exists');
        done();
      });
  });
  it('User must be able to login', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'User successfully logged in');
        done();
      });
  });
  it('Another User must be able to login', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(login2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'User successfully logged in');
        done();
      });
  });
  it('When no email is passed', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(usercatch)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', '"email" is required');
        done();
      });
  });
  it('Fiels required', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(usercatch)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', '"firstname" is required');
        done();
      });
  });
  it('User doesnt exist', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(usercheck)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          'error',
          'User with provided email doesnt exist'
        );
        done();
      });
  });
  it('Incorrect Password Provided', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userpass)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Password is incorrect');
        done();
      });
  });
});
describe('RedFlag Tests', () => {
  it('No redflag found', done => {
    const id = 10;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/location`)
      .set('token', realtoken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
  it('Viewing redflag that doesnt exist', done => {
    chai
      .request(app)
      .get('/api/v1/red-flags')
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflags not found');
        done();
      });
  });
  it('Viewing specific redflag that doesnt exist', done => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/red-flags/${id}`)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
  it('Updating the location of a redflag that doesnt exist', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/location`)
      .set('token', realtoken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
  it('Redflag having empty fields', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set('token', realtoken)
      .send(redflagempty)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          '"title" is not allowed to be empty'
        );
        done();
      });
  });
  it('Deleting a redflag that doesnt exist', done => {
    const id = 3;
    chai
      .request(app)
      .delete(`/api/v1/red-flags/${id}`)
      .set('token', realtoken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
  it('Updating the comment of a redflag that doesnt exist', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/comment`)
      .set('token', realtoken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
});
describe('App Test', () => {
  it('Welcome message', done => {
    chai
      .request(app)
      .get('/')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Welcome to Broadcaster');
        done();
      });
  });
});
describe('Token Test', () => {
  it('No token found', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'No token found');
        done();
      });
  });
  it('Jwt malformed token', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set('token', 'hello')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'jwt malformed');
        done();
      });
  });
  it('Invalid Signature', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set('token', `${realtoken}sbvs`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'invalid signature');
        done();
      });
  });
});