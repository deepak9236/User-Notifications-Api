import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Setup Swagger UI documentation
  const config = new DocumentBuilder()
    .setTitle('User Preferences API')
    .setDescription('API for managing user notification preferences')
    .setVersion('1.0')
    .addServer('https://user-notifications-api.vercel.app') // Add your production URL here
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Configure SwaggerModule with custom options
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'API Documentation',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css'
    ]
  });

  const port = process.env.PORT || 5002;
  await app.listen(port);
  console.log(`Server is running on port: ${port}`);
}

bootstrap();