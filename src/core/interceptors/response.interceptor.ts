import { CallHandler, map, catchError, HttpStatus, HttpException, Logger, ExecutionContext, Injectable, NestInterceptor, Observable, throwError } from "../../core";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = {
      success: false,
      status: statusCode,
      message: exception.message,
      error: exception.stack
    };
    Logger.log(body);
    response.status(statusCode).json(body);
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const body = {
      success: true,
      status: response.statusCode,
      message: res.message,
      result: res.result
    };
    Logger.log(body);
    return body;
  }
}
