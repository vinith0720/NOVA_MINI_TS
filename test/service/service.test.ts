import request from 'supertest';
import app from '../../src/app';

describe('POST /', () => {
  it('should return a token when name is provided', async () => {
    const response = await request(app).post('/').send({ name: 'novastrid' });

    expect(response.statusCode).toBe(200);

    // ✅ if the response has { token: 'some-token' }
    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });
});
