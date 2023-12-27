import { HttpStatus, Logger } from "../../common";

interface Response {
  status?: HttpStatus;
  success?: boolean;
  message?: string | null | undefined;
  error?: Error;
  stackTrace?: any;
}

export class ErrorResponseService {
  private response: Response = { message: "Internal server error", success: false, status: HttpStatus.INTERNAL_SERVER_ERROR };

  async apiResponse(payload: Response): Promise<Response> {
    this.response.status = payload?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    this.response.success = payload?.success || false;
    this.response.message = payload?.error?.message || payload?.message;
    this.response.stackTrace = payload?.stackTrace;

    Logger.log("[ErrorResponseService.apiResponse]", { response: this.response });

    return this.response;
  }
}
