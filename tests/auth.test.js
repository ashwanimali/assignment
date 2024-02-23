const request = require('supertest');
const app = require('../server');
const User = require('../models/user-model');

describe('Authentication Controller', () => {
    let authToken;

    before(async () => {
        await User.create({
            email: 'test@example.com',
            password: 'testpassword'
        });
    });

    it('should login with valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'admin@gmail.com',
                password: 'adminpassword'
            });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('user');
        expect(response.body).to.have.property('authToken');
        authToken = response.body.authToken;
    });

    it('should return error for login with invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'invalidpassword'
            });

        expect(response.statusCode).to.equal(401);
        expect(response.body).to.have.property('error', 'Login failed! Check authentication credentials');
    });

    it('should logout successfully', async () => {
        const response = await request(app)
            .post('/logout')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message', 'LogOut Successfully');
    });
});
