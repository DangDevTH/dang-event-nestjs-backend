import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SanitizeInputPipe } from './guards/SanitizeInputPipe';
import { ConfigService } from '@nestjs/config'; 
import { config } from 'aws-sdk';
import * as graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 6 }));

  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get<string>('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get<string>('appConfig.awsSecretAccessKey'),
    },
    region: configService.get<string>('appConfig.awsRegion'),
  });

  app.useGlobalPipes(new SanitizeInputPipe());

  app.enableCors({
    origin: ['http://localhost:3500'],
    allowedHeaders: ['Content-Type', 'Accept','Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
  });


  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(configService.getOrThrow<number>('appConfig.port'));
}
bootstrap();
