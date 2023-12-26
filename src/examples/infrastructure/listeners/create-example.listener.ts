import { Inject, Injectable, Logger, OnEvent } from "../../../core";
import { ExampleCreatedEvent } from "../../domain/events/example-created.event";
import { ExampleOutputRepository } from "../../domain/ports/output/example-output.repository";

@Injectable()
export class CreateExampleListener {
  constructor(@Inject("ProviderExampleRepository") private repository: ExampleOutputRepository) {}

  @OnEvent("example.created")
  async handle(event: ExampleCreatedEvent) {
    Logger.log("[CreateExampleListener.handle]", { event });

    return this.repository.create(event.exampleEntity);
  }
}
