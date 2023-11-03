import { OnQueueFailed, Process, Processor } from "@nestjs/bull"
import { Inject, Logger } from "@nestjs/common"
import { Job } from "bull"
import { ExampleCreatedEvent } from "../events/example-created.event"
import { ExampleOutputRepository } from "../ports/output/example-output.repository"

@Processor()
export class CreateExampleJob {
  constructor(@Inject("ProviderExampleRepository") private provider: ExampleOutputRepository) {}

  @Process("example.created")
  async handle(job: Job<ExampleCreatedEvent>) {
    Logger.log("[CreateExampleJob.handle]", { job })

    const event = job.data
    return this.provider.create(event.exampleEntity)
  }

  @OnQueueFailed({ name: "example.created" })
  handleError(error: Error) {
    Logger.error("[CreateExampleJob.handleError]", { error })

    return error
  }
}
