import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  // Allow the Beta UI (and other Coolify frontends) to call this API from another origin.
  const allowedOrigins = [
    'https://z5005rijz166p9ojs5rmkeoe.lanna.engineer',
  ];
  if (process.env.CORS_ORIGIN) {
    allowedOrigins.push(
      ...process.env.CORS_ORIGIN.split(',').map((value) => value.trim()).filter(Boolean),
    );
  }
  app.enableCors({
    origin: [...new Set(allowedOrigins)],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project Alpha Prototype API')
    .setDescription('Prototype CRUD API for mothers, groups, meetings, applications, and memberships.')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  return app;
}
