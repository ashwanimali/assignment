const request = require('supertest');
const app = require('../server'); 
const User = require('../models/user-model');

describe('User Controller', () => {
  let authToken;
  let userId;

  before(async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });
    authToken = response.body.authToken;

    const userResponse = await request(app)
      .post('/createUser')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        username: 'testuser',
        password: 'testpassword',
        role: 1
      });

    userId = userResponse.body.data._id;
  });

  it('should create a user', async () => {
    const response = await request(app)
      .post('/createUser')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test User 2',
        email: 'testuser2@example.com',
        username: 'testuser2',
        password: 'testpassword',
        role: 1
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User Created SuccessFully');
    expect(response.body.data).toHaveProperty('_id');
  });

  it('should update a user', async () => {
    const response = await request(app)
      .put(`/updateUser/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Updated Test User' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User Update SuccessFully');
  });
});
