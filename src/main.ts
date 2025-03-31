import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { PreloadDataProductsService } from './helpers/preloadDataProducts';
import { PreloadDataCategoriesService } from './helpers/preloadDataCategories';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  
  const preloadDataProductsService = app.get(PreloadDataProductsService);
  const preloadDataCategoriesService = app.get(PreloadDataCategoriesService);

  await preloadDataCategoriesService.preloadCategories();
  await preloadDataProductsService.preloadProducts();
  
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Nest')
    .setDescription(
      'Esta es una API construida con Nest para ser empleada en las demos del módulo 4 de la especialidad Backend de la carrera Fullstack Development',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const customCss = `
    body {
      background-color: #000 !important;
      color: #fff !important;
    }
    .swagger-ui .topbar, .swagger-ui .info {
      background-color: #000 !important;
    }
    .swagger-ui .info hgroup, .swagger-ui .info p, .swagger-ui .opblock-summary {
      color: #fff !important;
    }

    .opblock-tag {
    color: #fff !important;
    }

    .opblock-summary-path{
    color: #fff !important;
    }

    .model{
    color: #fff !important;
    }
    .model-title__text{
    color: #fff !important;
    }

    .col_header{
        color: #fff !important;
    }

    .response-col_status{
            color: #fff !important;

    }
    .tablinks{
    color: #fff !important;
    }
    .response-col_links{
        color: #fff !important;
    }

    .opblock-description-wrapper{
            color: #fff !important;

    }
    .models-control{
        color: #fff !important;

    } 

    .parameter__name{
            color: #fff !important;
    }

    .parameter__type{
                color: #fff !important;
    }

    .response-control-media-type__title{
            color: #fff !important;
    }

    .authorization__btn svg {
    fill: white !important;
    }
    .swagger-ui section.models {
    border: 1px solid rgba(255, 255, 255, 0.5); /* White border */
    }

    .swagger-ui section.models.is-open h4{
    border-bottom: 1px solid rgba(255, 255, 255, 0.5); /* White border */

    }
    .swagger-ui .opblock {
      background-color: #222 !important;
    }
    .swagger-ui .opblock .opblock-summary {
      background-color: #333 !important;
    }
    .swagger-ui .opblock .opblock-summary-method {
      color: #fff !important;
    }
    .swagger-ui .scheme-container{
      background-color: #000 !important;
    }
    .title {
      display: flex;
      align-items: center;
    }
    .title::before {
      content: "";
      background: url('https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg') no-repeat center;
      background-size: contain;
      width: 40px; /* Adjust as needed */
      height: 40px;
      display: inline-block;
      margin-right: 10px;
    }

    .topbar-wrapper a.link svg {
      display: none !important; /* Hide the default SVG logo */
    }

    .topbar-wrapper a.link {
      display: inline-block;
      width: 150px; /* Adjust width */
      height: 50px; /* Adjust height */
      background: url('https://henry-social-resources.s3-sa-east-1.amazonaws.com/henry-landing/assets/Henry/logo-white.png') no-repeat center;
      background-size: contain;
      margin-top: 10px; /* Adjust margin-top as needed */

    }
  `;
  const customSiteTitle = "Nest Demo";
  const customfavIcon = "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg"

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, { customCss, customSiteTitle, customfavIcon });

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
