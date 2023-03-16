const request = require('supertest');
const app = require('./app.js');

describe('GET /', () => {
  test('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
