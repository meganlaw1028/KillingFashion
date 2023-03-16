const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  test('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('GET /OrderPage', () => {
  test('responds with status 200', async () => {
    const response = await request(app).get('/OrderPage');
    expect(response.status).toBe(200);
  });
});

describe('POST /subscribe', () => {
  test('responds with success message', async () => {
    const response = await request(app)
      .post('/subscribe')
      .send({ lastname: 'Doe', email: 'john@example.com', newsletter: true });
    expect(response.text).toContain('Thank you for subscribing!');
  });
});

describe('GET /rating.do', () => {
  test('redirects to /index.html', async () => {
    const response = await request(app).get('/rating.do?rating=5&comments=Great%20product!');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/index.html');
  });
});

describe('GET /order.php', () => {
  test('writes to data.json and responds with success message if verification is correct', async () => {
    const response = await request(app)
      .get('/order.php?clientname=John&PWD=pass123&address=123%20Main%20St&Cardnumber=1234&paymethod=Visa&quantity=1&size=9&verification=qGphJD&otherField=Other');
    expect(response.text).toContain('Thank you for your purchase!');
  });

  test('responds with error message if verification is incorrect', async () => {
    const response = await request(app)
      .get('/order.php?clientname=John&PWD=pass123&address=123%20Main%20St&Cardnumber=1234&paymethod=Visa&quantity=1&size=9&verification=incorrect&otherField=Other');
    expect(response.text).toContain('Sorry, your purchase could not be completed');
  });
});

describe('GET /done', () => {
  test('responds with confirm data from data.json', async () => {
    const response = await request(app).get('/done');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].clientname).toBe('John');
  });
});
