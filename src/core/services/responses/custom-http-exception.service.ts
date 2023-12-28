import { HttpException, HttpStatus } from "../../common";

export class CustomHttpExceptionService extends HttpException {
  constructor(message: string, httpStatusCode: HttpStatus) {
    super(message, httpStatusCode);
  }
}
