import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import helmet from "helmet";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { GlobalExceptionFilter } from "../src/common/filters/global-exception.filter";
import { TransformInterceptor } from "../src/common/interceptors/transform.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    const configService = app.get(ConfigService);

    app.useLogger(app.get(Logger));
    app.use(helmet());
    
    app.enableCors({
      origin: configService.get<string>("FRONTEND_URL", "https://fleximanage-web.vercel.app"),
      credentials: true,
    });

    app.use(compression());
    app.use(cookieParser());

    app.setGlobalPrefix("api");
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: "1",
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    if (configService.get<string>("NODE_ENV") !== "production") {
      const config = new DocumentBuilder()
        .setTitle("FlexiManage ERP API")
        .setDescription("Enterprise ERP SaaS Backend")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
      const document = SwaggerModule.createDocument(app as any, config);
      SwaggerModule.setup("api/docs", app as any, document);
    }

    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

export default async function (req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}
