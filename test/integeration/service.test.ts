import request from 'supertest';
import app from '../../src/app';

describe('POST /', () => {
  it('should return a token when name is provided', async () => {
    const response = await request(app).post('/').send({ name: 'novastrid' });

    expect(response.statusCode).toBe(200);

    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });

  it('shoul return a message company not found', async () => {
    const response = await request(app).post('/').send({ name: 'nice' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: 'Company not found',
    });
  });
});

describe('GET /', () => {
  let token: string;
  beforeAll(async () => {
    const response = await request(app).post('/').send({ name: 'novastrid' });
    console.log(response.body);

    token = response.body.token;
  });

  it('Should return a list of company', async () => {
    const response = await request(app).get('/company/get').set('authorization', token);

    // expect(response.body).toEqual({
    //   message: 'Access denied. No token provided.',
    // });
    expect(response.statusCode).toBe(200);
  });
});
