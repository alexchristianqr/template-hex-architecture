import { Inject, Injectable, Logger } from "@nestjs/common"
import EventEmitter from "events"
import { CreateExampleDto } from "../../application/dto/create-example.dto"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"
import { ExampleOutputRepository } from "../ports/output/example-output.repository"
import { ExampleEntity } from "../entities/example.entity"
import { ExampleCreatedEvent } from "../events/example-created.event"
import { ExampleInputService } from "../ports/input/example-input.service"

@Injectable()
export class ExampleService implements ExampleInputService {
  constructor(
    @Inject("ProviderExampleRepository") private provider: ExampleOutputRepository,
    @Inject("ProviderEventEmitter") private eventEmitter: EventEmitter
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleService.create]", { createExampleDto })

    // Crear
    const data = new ExampleEntity(createExampleDto)
    await this.provider.create(data)

    // Emitir evento
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(data))

    return {
      success: true,
      message: "example created",
      result: data
    }
  }

  async findAll(): Promise<any> {
    Logger.log("[ExampleService.findAll]")

    const data = await this.provider.findAll()

    return {
      success: true,
      message: "get examples",
      result: data
    }
  }

  async findById(id: number): Promise<any> {
    Logger.log("[ExampleService.findOne]", { id })

    const data = await this.provider.findById(id)

    return {
      success: true,
      message: "get example by id",
      result: data
    }
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleService.update]", { id, updateExampleDto })

    // Actualizar
    await this.provider.update(id, updateExampleDto)

    // Emitir evento
    this.eventEmitter.emit("example.updated", new ExampleCreatedEvent(updateExampleDto))

    return {
      success: true,
      message: "example updated",
      result: { id, ...updateExampleDto }
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
