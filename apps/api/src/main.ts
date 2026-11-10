import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupApp } from './app.setup.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins = (process.env.CORS_ORIGINS ?? 'https://davidmanuel.fr').split(',').map((o) => o.trim());
  setupApp(app, origins);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
