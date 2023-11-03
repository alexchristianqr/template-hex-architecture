import { Inject, Injectable, Logger } from "@nestjs/common"
import { ExampleCreatedEvent } from "../events/example-created.event"
import { ExampleOutputRepository } from "../ports/output/example-output.repository"
import { OnEvent } from "@nestjs/event-emitter"

@Injectable()
export class CreateExampleListener {
  constructor(
    @Inject("ProviderExampleIntegrationGateway")
    private provider: ExampleOutputRepository
  ) {}

  @OnEvent("example.created")
  async handle(event: ExampleCreatedEvent) {
    Logger.log("[CreateExampleListener.handle]", { event })

    return this.provider.create(event.exampleEntity)
  }
}
