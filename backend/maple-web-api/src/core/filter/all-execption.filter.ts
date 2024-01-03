import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class AllExecptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    if(exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        code: status,
        timestamp: new Date().toLocaleString(),
        message: exception.message,
        path: request.url,
      });
    } else {
      response.status(500).json({
        code: 500,
        timestamp: new Date().toLocaleString(),
        message: exception,
        path: request.url,
      });
    }
  }
}
