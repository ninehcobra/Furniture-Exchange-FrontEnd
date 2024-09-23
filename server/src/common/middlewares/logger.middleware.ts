import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      const endTime = Date.now();

      const duration = (endTime - startTime) / 1000;

      this.logger.fatal(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - duration:${duration}s`,
      );
    });

    next();
  }
}
