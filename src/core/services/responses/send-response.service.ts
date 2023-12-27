import { HttpStatus, Logger } from "../../common";

interface Response {
  status?: HttpStatus;
  success?: boolean;
  message: string | null | undefined;
  result?: any | undefined;
}

export class SendResponseService {
  private response: Response = { message: undefined, success: true, result: undefined, status: HttpStatus.OK };

  async apiResponse(payload: Response): Promise<Response> {
    this.response.status = payload?.status || HttpStatus.OK;
    this.response.success = payload?.success || true;
    this.response.result = payload?.result || undefined;
    this.response.message = payload.message;

    Logger.log("[SendResponseService.apiResponse]", { response: this.response });

    return this.response;
  }
}
