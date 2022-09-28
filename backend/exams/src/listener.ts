import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: 'http://localhost:4200'
//   });
//   await app.listen(3001);
// }

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen();
}

bootstrap();