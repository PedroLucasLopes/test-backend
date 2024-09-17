import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from '../responses/error.types';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (process.env.LOGGER === 'true') console.log(exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof CustomError
        ? exception.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException || exception instanceof CustomError
        ? exception.message
        : 'Internal server error';

    let location = null;
    let errorDetails = null;

    if (exception.stack) {
      const stackLines = exception?.stack?.split('\n');
      const filename = stackLines[2].split('crm');
      location = filename[1];

      const d = exception?.stack?.split('at ');
      const e = d[0].split(filename[1]);
      errorDetails = e[1]
    }

    const errorResponse = {
      statusCode: status,
      message: message,
      res: null,
      error: { url: request.url, location: location, errorDetails },
    };

    response.status(status).json(errorResponse);
  }
}
