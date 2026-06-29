import 'dotenv/config';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import type { NextFunction, Request, Response } from 'express';

const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function colorize(value: string | number, color: keyof typeof colors) {
  return `${colors[color]}${value}${colors.reset}`;
}

function getStatusColor(statusCode: number) {
  if (statusCode >= 500) {
    return 'red';
  }

  if (statusCode >= 400) {
    return 'yellow';
  }

  return 'green';
}

function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();
  const { method } = req;
  const url = req.originalUrl || req.url;

  const logRequest = () => {
    const duration = Date.now() - startedAt;
    const statusCode = res.statusCode;
    const contentLength = res.getHeader('content-length') ?? '-';
    const statusColor = getStatusColor(statusCode);
    const message = [
      colorize(method.padEnd(6), 'cyan'),
      url,
      colorize(statusCode, statusColor),
      colorize(`${duration}ms`, 'dim'),
      colorize(`${contentLength}b`, 'dim'),
    ].join(' ');

    if (statusCode >= 500) {
      console.error(message);
      return;
    }

    if (statusCode >= 400) {
      console.warn(message);
      return;
    }

    console.log(message);
  };

  res.once('finish', logRequest);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(requestLogger);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
