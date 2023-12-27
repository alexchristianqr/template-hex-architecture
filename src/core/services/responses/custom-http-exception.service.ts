import { HttpException, HttpStatus } from "../../common";

export class CustomHttpExceptionService extends HttpException {
  private stackTrace: string;

  constructor(message: string, httpStatusCode: HttpStatus) {
    super(message, httpStatusCode);
    this.stackTrace = this.stack;
  }
}
