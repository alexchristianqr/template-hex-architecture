import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { ExampleCreatedEvent } from "../events/example-created.event";
import { ExampleGatewayInterface } from "../gateways/example-gateway-interface";

@Processor()
export class CreateExampleJob {
  constructor(
    @Inject("ListIntegrationGateway")
    private exampleGatewayInterface: ExampleGatewayInterface,
  ) {}

  @Process("list.created")
  async handle(job: Job<ExampleCreatedEvent>) {
    console.log("job processando...");
    console.log(job.data);
    const event = job.data;
    await this.exampleGatewayInterface.create(event.exampleEntity);
  }

  @OnQueueFailed({ name: "example.created" })
  handleError(error: Error) {
    console.log("CreateListInCrmJob", error);
  }
}
