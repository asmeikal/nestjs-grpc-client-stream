import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(3000);
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
