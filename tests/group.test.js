const request = require('supertest');
const app = require('../server');
const Group = require('../models/group-model');

describe('Group Controller', () => {
    let authToken;
    let groupId;

    before(async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'testpassword'
            });
        authToken = response.body.authToken;
        const groupResponse = await request(app)
            .post('/createGroup')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Test Group' });

        groupId = groupResponse.body.data._id;
    });

    it('should create a group', async () => {
        const response = await request(app)
            .post('/createGroup')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Test Group' });

        groupId = response.body.data._id;

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Group Created SuccessFully');
        expect(response.body.data).toHaveProperty('_id');
    });

    it('should delete a group', async () => {
        const response = await request(app)
            .delete(`/deleteGroup/${groupId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Group Deleted SuccessFully');
    });

    it('should search for groups', async () => {
        const response = await request(app)
            .get(`/searchGroups/Test Group`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Group find SuccessFully');
        expect(response.body.data).toHaveProperty('name', 'Test Group');
    });

    it('should add members to a group', async () => {
        const response = await request(app)
            .post(`/addMembersToGroup/${groupId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ userId: 'user_id_to_add' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User Added to Group SuccessFully');
    });
});
