import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Observable, BadGatewayException, catchError, throwError, CoreService } from "../../core";

@Injectable()
export class ResponseInterceptor extends CoreService implements NestInterceptor {
  constructor() {
    super();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError((error) => this.response.error.apiResponse(error)));
    // return next.handle().pipe(catchError(() => throwError(() => new BadGatewayException())));
  }
}
