import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

export async function bootstrap() { // <-- export
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
  const logger = new Logger('bootstrap');
  logger.log(`Listening on ${await app.getUrl()}`);
}

bootstrap().catch((e) => console.log(`Error al iniciar la aplicacion: ${e}`));