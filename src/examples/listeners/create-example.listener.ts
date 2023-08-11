import { Inject, Injectable, Logger } from "@nestjs/common";
import { ExampleCreatedEvent } from "../events/example-created.event";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class CreateExampleListener {
  constructor(
    @Inject("ProviderExampleIntegrationGateway")
    private provider: ExampleGatewayInterface
  ) {}

  @OnEvent("example.created")
  async handle(event: ExampleCreatedEvent) {
    Logger.log("[CreateExampleListener.handle]", { event });

    return this.provider.create(event.exampleEntity);
  }
}
