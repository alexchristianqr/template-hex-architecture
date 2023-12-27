import { CallHandler, map, CoreService, ExecutionContext, Injectable, NestInterceptor, Observable } from "../../core";

@Injectable()
export class ResponseInterceptor extends CoreService implements NestInterceptor {
  constructor() {
    super();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((response) => response));
  }
}
