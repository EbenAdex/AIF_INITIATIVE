import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableCors({
     origin: [
    'https://aif-initiative.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'https://aif-initiative.onrender.com',
    'https://aif-initiative-spx3.vercel.app',
  ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('AIF API')
    .setDescription(
      'Backend API for the AIF Foundation website and administration portal. Public endpoints support scholarships, events, and donation campaigns. Endpoints marked with a bearer token require an authenticated user; administrative endpoints require the ADMIN or SUPER_ADMIN role. Successful responses use the `{ success: true, data }` envelope.',
    )
    .setVersion('1.0')
      .addServer(
    'https://aif-initiative.onrender.com',
    'Production API',
  )
    .addTag('System', 'Service health and operational endpoints')
    .addTag(
      'Authentication',
      'Registration, sessions, email verification, and password recovery',
    )
    .addTag('Users', 'Authenticated profile and user administration')
    .addTag(
      'Scholarships',
      'Public scholarship discovery and administrator management',
    )
    .addTag('Applications', 'Scholarship submissions and application review')
    .addTag('Events', 'Public foundation events and administrator management')
    .addTag(
      'Donation Campaigns',
      'Public fundraising campaigns and administrator management',
    )
    .addTag('Notifications', 'User notifications and administrator delivery')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
