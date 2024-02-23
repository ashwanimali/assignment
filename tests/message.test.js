const request = require('supertest');
const app = require('../server');
const Message = require('../models/message-model');
const Like = require('../models/like-model');

describe('Message Controller', () => {
  let authToken;
  let messageId;

  before(async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });
    authToken = response.body.authToken;

    const messageResponse = await request(app)
      .post('/sendMessage')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message: 'Test message', groupId: 'group_id' });

    messageId = messageResponse.body.data._id;
  });

  it('should send a message', async () => {
    const response = await request(app)
      .post('/sendMessage')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message: 'Test message', groupId: 'group_id' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message Created SuccessFully');
    expect(response.body.data).toHaveProperty('_id');
  });

  it('should find a message', async () => {
    const response = await request(app)
      .get(`/findMessage/${messageId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message Find SuccessFully');
    expect(response.body.data).toHaveProperty('_id', messageId);
  });

  it('should delete a message', async () => {
    const response = await request(app)
      .delete(`/deleteMessage/${messageId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message Deleted SuccessFully');
  });

  it('should like a message', async () => {
    const response = await request(app)
      .post(`/likeMessage`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ pattern: 'like', messageId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message Liked SuccessFully');
    expect(response.body.data).toHaveProperty('pattern', 'like');
  });

  it('should get all likes for a message', async () => {
    const response = await request(app)
      .get(`/getLikes/${messageId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'All Liked Get SuccessFully');
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });
});
