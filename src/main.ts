import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.enableCors({
    origin: ['http://localhost:3000', 'https://github.com/dianaimmatova/eventhub-frontend.git'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })

  )

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('EventHub API')
    .setDescription('API для aфиши мероприятий')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
