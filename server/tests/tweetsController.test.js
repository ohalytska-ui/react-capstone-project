// require the dev-dependencies
import app from '../app.js';
import { expect } from 'chai';
import request from 'supertest';
import { tweet } from '../mock/tweet.js';
import { user } from '../mock/user.js';

// mocha & chai
describe('tweetsController.test.test', () => {
  it('it should create new user tweet', async () => {
    const res = await request(app).post('/api/user/tweet').send(tweet);
    expect(res.status).to.equal(201);
  });

  it('it should not create new user tweet', async () => {
    const res = await request(app).post('/api/user/tweet').send({});
    expect(res.status).to.equal(400);
  });

  it('it should get all user tweets', async () => {
    const res = await request(app).get(`/api/user/${user.id}/tweets`);
    expect(res.status).to.equal(200);
    expect(res.body).be.a('array');
  });

  it('it should not delete non-existent user tweet', async () => {
    const res = await request(app).delete(`/api/user/tweet/${'noId'}/delete`);
    expect(res.status).to.equal(400);
  });
});
