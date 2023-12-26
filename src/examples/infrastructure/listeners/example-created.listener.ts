import { Injectable, Logger, OnEvent, InjectQueue, Queue } from "../../../core";
import { ExampleCreatedEvent } from "../../domain/events/example-created.event";

@Injectable()
export class ExampleCreatedListener {
  constructor(@InjectQueue("default") private queue: Queue) {}

  @OnEvent("example.created")
  async handle(event: ExampleCreatedEvent) {
    Logger.log("[ExampleCreatedListener.handle]", { event });

    return this.queue.add("example.created", event);
  }
}
