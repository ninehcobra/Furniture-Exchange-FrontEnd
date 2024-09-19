import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_DOCS_CREDENTIALS } from 'src/common/constants/api-docs.constant';

const swaggerConfig = (app: INestApplication) => {
  const swaggerUrl = '/api-docs';

  const config = new DocumentBuilder()
    .setTitle('Furniture exchange API')
    .setDescription('API for furniture exchange')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const httpAdepter = app.getHttpAdapter();

  httpAdepter.use(swaggerUrl, (req, res, next) => {
    function parseAuthHeader(input: string): { name: string; pass: string } {
      const [, encodedPart] = input.split(' ');

      const buff = Buffer.from(encodedPart, 'base64');

      const text = buff.toString('ascii');

      const [name, pass] = text.split(':');

      return { name, pass };
    }

    function unauthorizedResponse(): void {
      res.status(401);

      // set the header to allow the browser to prompt the user for credentials
      res.set('WWW-Authenticate', 'Basic');

      next();
    }

    if (!req.headers.authorization) {
      return unauthorizedResponse();
    }

    const credentials = parseAuthHeader(req.headers.authorization);

    if (
      credentials?.name !== API_DOCS_CREDENTIALS.name ||
      credentials?.pass !== API_DOCS_CREDENTIALS.pass
    ) {
      return unauthorizedResponse();
    }

    next();
  });

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerUrl, app, document, {
    jsonDocumentUrl: 'api-docs/json',
  });
};

export default swaggerConfig;
