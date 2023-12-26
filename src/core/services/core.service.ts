import { SendResponseService, ErrorResponseService } from "./responses";

interface ResponseCoreService {
  send: SendResponseService;
  error: ErrorResponseService;
}

export abstract class CoreService {
  protected readonly response: ResponseCoreService = { send: new SendResponseService(), error: new ErrorResponseService() };
}
