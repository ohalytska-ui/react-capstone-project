// require the dev-dependencies
import app from '../app.js';
import { expect } from 'chai';
import request from 'supertest';
import { user } from '../mock/user.js';
// jwt token
import jwt from 'jsonwebtoken';

// mocha & chai
describe('usersController.test', () => {
  it('it should create new user account', async () => {
    const res = await request(app).post('/api/register').send(user);
    expect(res.status).to.equal(201);
    expect(res.body).be.a('object');
  });

  it('it should not create already exist user account', async () => {
    const res = await request(app).post('/api/register').send(user);
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email');
  });

  it('it should login to user account', async () => {
    const res = await request(app).post('/api/login').send({ username: user.username, password: user.password });
    expect(res.status).to.equal(201);
  });

  it('it should not login to non-existent user account', async () => {
    const res = await request(app).post('/api/login').send({ username: 'noUserName', password: 'noUserName' });
    expect(res.status).to.equal(400);
  });

  it('it should get user info', async () => {
    // create token
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: '12h',
      },
    );

    const res = await request(app).get('/api/user').set({ Authorization: token, 'Content-Type': 'application/json' });
    expect(res.status).to.equal(200);
    expect(res.body).be.a('object');
    expect(res.body).have.property('id');
    expect(res.body).have.property('username');
    expect(res.body).have.property('fullname');
    expect(res.body).have.property('email');
    expect(res.body).have.property('password');
  });
});
