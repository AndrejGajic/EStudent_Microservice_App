import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3003
    }
  });
  app.enableCors({
    origin: 'http://localhost:4200'
  });
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
