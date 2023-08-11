import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bull";
import { ExampleCreatedEvent } from "../events/example-created.event";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";

@Processor()
export class CreateExampleJob {
  constructor(
    @Inject("ProviderExampleIntegrationGateway")
    private provider: ExampleGatewayInterface
  ) {}

  @Process("example.created")
  async handle(job: Job<ExampleCreatedEvent>) {
    Logger.log("[CreateExampleJob.handle]", { job });

    const event = job.data;
    return this.provider.create(event.exampleEntity);
  }

  @OnQueueFailed({ name: "example.created" })
  handleError(error: Error) {
    Logger.error("[CreateExampleJob.handleError]", { error });

    return error;
  }
}
