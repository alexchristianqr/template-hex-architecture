import { Inject, Injectable, Logger } from "@nestjs/common"
import EventEmitter from "events"
import { CreateExampleDto } from "../../application/dto/create-example.dto"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"
import { ExampleOutputRepository } from "../ports/output/example-output.repository"
import { ExampleEntity } from "../entities/example.entity"
import { ExampleCreatedEvent } from "../events/example-created.event"
import { ExampleInputUsecase } from "../ports/input/example-input.usecase"

@Injectable()
export class ExampleService implements ExampleInputUsecase {
  constructor(
    @Inject("ProviderExampleRepository") private provider: ExampleOutputRepository,
    @Inject("ProviderEventEmitter") private eventEmitter: EventEmitter
  ) {}

  async create(payload: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleService.create]", { payload })

    // Crear
    const data = new ExampleEntity(payload)
    await this.provider.create(data)

    // Emitir evento
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(payload))

    return {
      success: true,
      message: "example created",
      result: data
    }
  }

  async getAll(): Promise<any> {
    Logger.log("[ExampleService.getAll]")

    const data = await this.provider.getAll()

    return {
      success: true,
      message: "get examples",
      result: data
    }
  }

  async getById(id: number): Promise<any> {
    Logger.log("[ExampleService.getById]", { id })

    const data = await this.provider.getById(id)

    return {
      success: true,
      message: "get example by id",
      result: data
    }
  }

  async update(id: number, payload: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleService.update]", { id, payload })

    // Actualizar
    const data = await this.provider.update(id, payload)

    // Emitir evento
    this.eventEmitter.emit("example.updated", new ExampleCreatedEvent(payload))

    return {
      success: true,
      message: "example updated",
      result: { id, ...data }
    }
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleService.delete]", { id })

    await this.provider.delete(id)

    return {
      success: true,
      message: "example deleted",
      result: { id }
    }
  }
}
