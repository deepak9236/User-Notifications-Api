import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('PreferencesController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbConnection = moduleFixture.get<Connection>(getConnectionToken());
  });

  afterAll(async () => {
    await dbConnection.collection('userpreferences').deleteMany({});
    await app.close();
  });

  const preferencePayload = {
    userId: 'user123',
    email: 'user@example.com',
    preferences: {
      marketing: true,
      newsletter: false,
      updates: true,
      frequency: 'weekly',
      channels: {
        email: true,
        sms: false,
        push: true,
      },
    },
    timezone: 'America/New_York',
  };

  it('/api/preferences (POST) should create a preference', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/preferences')
      .send(preferencePayload)
      .expect(201);

    expect(response.body.userId).toBe(preferencePayload.userId);
    expect(response.body.email).toBe(preferencePayload.email);
  });

  it('/api/preferences/:userId (GET) should return a preference', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/preferences/user123')
      .expect(200);

    expect(response.body.userId).toBe('user123');
    expect(response.body.email).toBe('user@example.com');
  });

  it('/api/preferences/:userId (PATCH) should update a preference', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/preferences/user123')
      .send({ timezone: 'UTC' })
      .expect(200);

    expect(response.body.timezone).toBe('UTC');
  });

  it('/api/preferences/:userId (DELETE) should delete a preference', async () => {
    await request(app.getHttpServer()).delete('/api/preferences/user123').expect(200);
  });

  it('/api/preferences/:userId (GET) should return 404 for deleted preference', async () => {
    await request(app.getHttpServer()).get('/api/preferences/user123').expect(404);
  });
});
