import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Khflix API')
    .setDescription('ទិន្ន័យ API សំរាប់ប្រើប្រាស់ក្នុងវេបសាយ Khflix')
    .addBearerAuth()
    .setContact('Khflix',"https://api.khflix.com",'contact@khflix.com')
    .setVersion('1.0')
    .addTag('khflix')
    .addServer('http://localhost:3000/','ប្រើប្រាស់សំរាប់ការអភិវឌ្ឍន៏')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
