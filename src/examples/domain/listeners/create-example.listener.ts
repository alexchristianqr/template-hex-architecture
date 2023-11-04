import { Inject, Injectable, Logger, OnEvent } from "../../../core"
import { ExampleCreatedEvent } from "../events/example-created.event"
import { ExampleOutputRepository } from "../ports/output/example-output.repository"

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
