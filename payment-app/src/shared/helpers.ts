import { Request, Response } from 'express';
import { logger } from '../shared/logger';

export const tryParseJson = (data: any): any => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

export const logReq = (req: Request): void => {
  logger.info(
    {
      request: {
        method: req.method,
        originalUrl: req.originalUrl,
        headers: req.headers,
        body: req.body,
      },
    },
    'Request',
  );
};

export const logRes = (req: Request, res: Response): void => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  (res.write as unknown) = (...restArgs): void => {
    chunks.push(Buffer.from(restArgs[0]));
    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs): void => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }
    const body = Buffer.concat(chunks).toString('utf8');

    logger.info(
      {
        request: {
          method: req.method,
          originalUrl: req.originalUrl,
          headers: req.headers,
          body: req.body,
        },
        response: {
          statusCode: res.statusCode,
          headers: res.getHeaders(),
          body: tryParseJson(body),
        },
      },
      'Response',
    );

    oldEnd.apply(res, restArgs);
  };
};
