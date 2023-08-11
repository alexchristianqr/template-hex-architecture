import { Inject, Injectable } from "@nestjs/common";
import { ExampleCreatedEvent } from "../events/example-created.event";
import { ExampleGatewayInterface } from "../gateways/example-gateway-interface";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class CreateExampleListener {
  constructor(
    @Inject("ListIntegrationGateway")
    private exampleGatewayInterface: ExampleGatewayInterface,
  ) {}

  @OnEvent("list.created")
  async handle(event: ExampleCreatedEvent) {
    return this.exampleGatewayInterface.create(event.exampleEntity);
  }
}
