import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import { logger } from '@src/utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500;
    let message = '';
    let details: any = {};
    let name = '';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      details = exception.getResponse();
      name = exception.name;
    } else if (axios.isAxiosError(exception)) {
      status = exception.response?.status || 500;
      message = exception.response?.data?.message || exception.message;
      name = exception.response?.data?.name || exception.name;
    } else if (exception.name == 'Moralis SDK Core Error') {
      message = exception.message;
      name = 'NFT_SDK_ERROR';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
      name = 'INTERNAL_SERVER_ERROR';
    }

    if (status >= 500) {
      logger.error('unhandled internal server error:: ', exception);
    }

    if (typeof details === 'string') {
      details = { message: details };
    }

    // handle class-validator errors
    if (name === 'UnprocessableEntityException' && message === 'Unprocessable Entity Exception') {
      message = Array.isArray(details?.message) ? details.message[0] : message;
    }

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      isError: true,
      status,
      message,
      details,
      errors: details,
      name,
      data: null,
      traceId: response.getHeader('x-trace-id'),
    });
  }
}
