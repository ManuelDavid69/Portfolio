import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

/** Shared by main.ts and the e2e tests, so the tests run the same app as production. */
export function setupApp(app: INestApplication, corsOrigins: string[]) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors({ origin: corsOrigins, methods: ['GET', 'POST'] });
  // Behind the Azure proxy the real visitor IP is in X-Forwarded-For. The rate limit needs it.
  (app as NestExpressApplication).set('trust proxy', 1);
  app.enableShutdownHooks();
}
