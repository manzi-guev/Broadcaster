/* eslint-disable node/no-unsupported-features/es-syntax */
import chai from 'chai';
import http from 'chai-http';
import app from '../app';

chai.use(http);
chai.should();

const user = {
  firstname: 'Nuru',
  lastname: 'Abdou',
  email: 'abdoul@gmail.com',
  phonenumber: '+250785802789',
  username: 'gege',
  password: 'nurureal'
};

describe('User tests', () => {
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
});
