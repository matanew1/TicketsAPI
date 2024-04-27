import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // Enable CORS here
  const options = new DocumentBuilder()
    .setTitle('TICKET API')
    .setDescription('The TICKET API description')
    .setVersion('1.0')
    .addServer('http://localhost:4000/', 'Local environment')
    .addTag('tickets', 'All tickets related endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4000);
}

bootstrap();