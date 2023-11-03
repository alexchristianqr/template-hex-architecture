import { Injectable, Logger } from "@nestjs/common"
import { ExampleCreatedEvent } from "../events/example-created.event"
import { OnEvent } from "@nestjs/event-emitter"
import { Queue } from "bull"
import { InjectQueue } from "@nestjs/bull"

@Injectable()
export class ExampleCreatedListener {
  constructor(@InjectQueue("default") private queue: Queue) {}

  @OnEvent("example.created")
  async handle(event: ExampleCreatedEvent) {
    Logger.log("[ExampleCreatedListener.handle]", { event })

    return this.queue.add("example.created", event)
  }
}
