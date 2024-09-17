import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { CustomExceptionFilter } from './presentation/filters/exception.filters';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('developed by Pedro Lucas')
    .setVersion('1.0')
    .addTag('Routes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.NODE_PORT || 3333);
  console.log(
    `Application is running on port ${process.env.NODE_PORT || 3333}`,
  );
}
bootstrap();
