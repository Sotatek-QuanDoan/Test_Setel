import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logReq, logRes } from '../shared/helpers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next) {
    logReq(req);
    logRes(req, res);
    next();
  }
}
