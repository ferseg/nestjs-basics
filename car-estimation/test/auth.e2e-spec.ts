import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const email = 'e@e.com';
    const userRequest = {
      email,
      password: 'asdf',
    };
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(userRequest)
      .expect(201)
      .then((resp) => {
        const { id } = resp.body;
        const resEmail = resp.body.email;
        expect(id).toBeDefined();
        expect(resEmail).toEqual(email);
      });
  });
});
