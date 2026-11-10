import { execSync } from 'node:child_process';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { setupApp } from '../src/app.setup.js';
import { ContactQueue } from '../src/contact/contact-queue.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Runs the real app against a real PostgreSQL started in Docker by Testcontainers.
 * Only the Azure queue is replaced, by a list in memory.
 */
describe('API (e2e)', () => {
  let db: StartedPostgreSqlContainer;
  let app: INestApplication;
  let prisma: PrismaService;
  const queued: string[] = [];

  beforeAll(async () => {
    db = await new PostgreSqlContainer('postgres:17').start();
    process.env.DATABASE_URL = db.getConnectionUri();
    process.env.STORAGE_CONNECTION_STRING = 'UseDevelopmentStorage=true';
    execSync('npx prisma migrate deploy', { env: process.env, stdio: 'ignore' });

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ContactQueue)
      .useValue({ send: async (id: string) => void queued.push(id) })
      .compile();

    app = moduleRef.createNestApplication();
    setupApp(app, ['http://localhost:4300']);
    await app.init();
    prisma = app.get(PrismaService);
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await db?.stop();
  });

  it('GET /health answers ok', async () => {
    await request(app.getHttpServer()).get('/health').expect(200, { status: 'ok' });
  });

  it('POST /contact saves the message and queues it', async () => {
    await request(app.getHttpServer())
      .post('/contact')
      .send({ name: 'Ada', email: 'ada@example.com', message: 'Hello', lang: 'en' })
      .expect(202);

    const saved = await prisma.contactMessage.findMany();
    expect(saved).toHaveLength(1);
    expect(saved[0].sentAt).toBeNull();
    expect(queued).toEqual([saved[0].id]);
  });

  it('POST /contact refuses an invalid message', async () => {
    const res = await request(app.getHttpServer())
      .post('/contact')
      .send({ name: '', email: 'not-an-email', message: 'Hi', lang: 'de' })
      .expect(400);

    expect(res.body.message).toHaveLength(3);
  });

  it('POST /contact refuses unknown fields', async () => {
    await request(app.getHttpServer())
      .post('/contact')
      .send({ name: 'Ada', email: 'ada@example.com', message: 'Hi', lang: 'en', admin: true })
      .expect(400);
  });

  it('GET /repos returns the stats written by the nightly function', async () => {
    await prisma.repoStats.create({
      data: { repo: 'QRShield', lastCommitAt: new Date('2026-11-01T10:00:00Z'), languages: ['Python', 'TypeScript'], stars: 2 },
    });

    const res = await request(app.getHttpServer()).get('/repos').expect(200);
    expect(res.body).toEqual([
      { repo: 'QRShield', lastCommitAt: '2026-11-01T10:00:00.000Z', languages: ['Python', 'TypeScript'], stars: 2 },
    ]);
  });
});
