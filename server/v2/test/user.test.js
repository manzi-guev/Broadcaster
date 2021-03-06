/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
import chai from 'chai';
import http from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../app';
import gentoken from '../helpers/helperToken';

dotenv.config();

chai.use(http);
chai.should();

const realtoken = gentoken('abdoul@gmail.com', 'user');
const faketoken = gentoken('manzi@gmail.com', 'user');
const admin = gentoken('manziguevara@gmail.com', 'admin');

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
const adminlogin = {
  email: 'manziguevara@gmail.com',
  password: 'gege1234'
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
const updatestatus = {
  status: 'Resolved'
};
const emptystatus = {
  status: ''
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
describe('User tests for Version 2', () => {
  it('Not authorized', done => {
    chai
      .request(app)
      .post('/api/v2/red-flags')
      .set('token', realtoken)
      .send(nouser)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Not authorized');
        done();
      });
  });
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
  it('User must be able to login', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
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
      .post('/api/v2/auth/signin')
      .send(login2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'User successfully logged in');
        done();
      });
  });
  it('Admin must be able to login', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(adminlogin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'User successfully logged in');
        done();
      });
  });
  it('When no email is passed', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
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
      .post('/api/v2/auth/signup')
      .send(usercatch)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          'First name must be letters only'
        );
        done();
      });
  });
  it('User doesnt exist', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
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
      .post('/api/v2/auth/signin')
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
      .patch(`/api/v2/red-flags/${id}/location`)
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
      .get('/api/v2/red-flags')
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
      .get(`/api/v2/red-flags/${id}`)
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
      .patch(`/api/v2/red-flags/${id}/location`)
      .set('token', realtoken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
  it('Redflag created', done => {
    chai
      .request(app)
      .post('/api/v2/red-flags')
      .set('token', realtoken)
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property(
          'message',
          'Redflag successfully created'
        );
        done();
      });
  });
  it('Second Redflag created', done => {
    chai
      .request(app)
      .post('/api/v2/red-flags')
      .set('token', realtoken)
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property(
          'message',
          'Redflag successfully created'
        );
        done();
      });
  });
  it('Redflag having empty fields', done => {
    chai
      .request(app)
      .post('/api/v2/red-flags')
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
  it('Viewing all redflags', done => {
    chai
      .request(app)
      .get('/api/v2/red-flags')
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          'message',
          'Success. List of all red-flags'
        );
        done();
      });
  });
  it('Not Owner message', done => {
    const id = 1;
    chai
      .request(app)
      .delete(`/api/v2/red-flags/${id}`)
      .set('token', faketoken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error', 'You are not the owner');
        done();
      });
  });
  it('Not Admin message', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/status`)
      .set('token', faketoken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error', 'You are not the Admin');
        done();
      });
  });
  it('Viewing specific redflag', done => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v2/red-flags/${id}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Updating the comment of a redflag with empty field', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/comment`)
      .set('token', realtoken)
      .send(emptycomment)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          '"comment" is not allowed to be empty'
        );
        done();
      });
  });
  it('Updating the comment of a redflag', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/comment`)
      .set('token', realtoken)
      .send(updatecomment)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Updated red-flag comment');
        done();
      });
  });
  it('Updating the status of a redflag with empty field', done => {
    const id = 2;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/status`)
      .set('token', admin)
      .send(emptystatus)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          '"status" is not allowed to be empty'
        );
        done();
      });
  });
  it('Updating the status of a redflag', done => {
    const id = 2;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/status`)
      .set('token', admin)
      .send(updatestatus)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Changed red-flag status');
        done();
      });
  });
  it('Updating the location of a redflag', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/location`)
      .set('token', realtoken)
      .send(updatelocation)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Updated red-flag location');
        done();
      });
  });
  it('Updating the location of a redflag with empty field', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/location`)
      .set('token', realtoken)
      .send(emptylocation)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          '"location" is not allowed to be empty'
        );
        done();
      });
  });
  it('Deleting a redflag', done => {
    const id = 1;
    chai
      .request(app)
      .delete(`/api/v2/red-flags/${id}`)
      .set('token', realtoken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          'message',
          'Redflag successfully deleted'
        );
        done();
      });
  });
  it('Deleting a redflag that doesnt exist', done => {
    const id = 3;
    chai
      .request(app)
      .delete(`/api/v2/red-flags/${id}`)
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
      .patch(`/api/v2/red-flags/${id}/comment`)
      .set('token', realtoken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Redflag not found');
        done();
      });
  });
  it('Updating the status of a redflag that doesnt exist', done => {
    const id = 6;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/status`)
      .set('token', admin)
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
  it('Route errors', done => {
    chai
      .request(app)
      .get('/feuf')
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Route not found');
        done();
      });
  });
});
describe('Token Test', () => {
  it('No token found', done => {
    chai
      .request(app)
      .post('/api/v2/red-flags')
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
      .post('/api/v2/red-flags')
      .set('token', 'hello')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Jwt malformed token', done => {
    const id = 2;
    chai
      .request(app)
      .patch(`/api/v2/red-flags/${id}/status`)
      .set('token', 'hello')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Invalid Signature', done => {
    chai
      .request(app)
      .post('/api/v2/red-flags')
      .set('token', `${realtoken}sbvs`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'invalid signature');
        done();
      });
  });
});
describe('User tests for version 1', () => {
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
  it('Redflag created', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set('token', realtoken)
      .send(redflag)
      //   .attach(
      //     'images',
      //     `${__dirname}../../../redflags/2019_10_22_122129IMG_0395.JPG`
      //   )
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property(
          'message',
          'Redflag successfully created'
        );
        done();
      });
  });
  it('Second Redflag created', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set('token', realtoken)
      .send(redflag)
      //   .attach(
      //     'images',
      //     `${__dirname}../../../redflags/2019_10_22_122129IMG_0395.JPG`
      //   )
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property(
          'message',
          'Redflag successfully created'
        );
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
  it('Viewing all redflags', done => {
    chai
      .request(app)
      .get('/api/v1/red-flags')
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          'message',
          'Success. List of all red-flags'
        );
        done();
      });
  });
  it('Not Owner message', done => {
    const id = 1;
    chai
      .request(app)
      .delete(`/api/v1/red-flags/${id}`)
      .set('token', faketoken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error', 'You are not the owner');
        done();
      });
  });
  it('Viewing specific redflag', done => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/red-flags/${id}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Updating the comment of a redflag with empty field', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/comment`)
      .set('token', realtoken)
      .send(emptycomment)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          '"comment" is not allowed to be empty'
        );
        done();
      });
  });
  it('Updating the comment of a redflag', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/comment`)
      .set('token', realtoken)
      .send(updatecomment)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Updated red-flag comment');
        done();
      });
  });
  it('Updating the location of a redflag', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/location`)
      .set('token', realtoken)
      .send(updatelocation)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Updated red-flag location');
        done();
      });
  });
  it('Updating the location of a redflag with empty field', done => {
    const id = 1;
    chai
      .request(app)
      .patch(`/api/v1/red-flags/${id}/location`)
      .set('token', realtoken)
      .send(emptylocation)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          'error',
          '"location" is not allowed to be empty'
        );
        done();
      });
  });
  it('Deleting a redflag', done => {
    const id = 1;
    chai
      .request(app)
      .delete(`/api/v1/red-flags/${id}`)
      .set('token', realtoken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          'message',
          'Redflag successfully deleted'
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
