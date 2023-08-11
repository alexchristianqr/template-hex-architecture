import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { ExampleCreatedEvent } from "../events/example-created.event";
import { ExampleGatewayInterface } from "../gateways/example-gateway-interface";

@Processor()
export class CreateExampleJob {
  constructor(
    @Inject("ProviderExampleIntegrationGateway")
    private provider: ExampleGatewayInterface,
  ) {}

  @Process("example.created")
  async handle(job: Job<ExampleCreatedEvent>) {
    const event = job.data;
    await this.provider.create(event.exampleEntity);
  }

  @OnQueueFailed({ name: "example.created" })
  handleError(error: Error) {
    console.log("CreateListInCrmJob", error);
  }
}
