import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update-example.dto";
import { ExampleGatewayInterface } from "./interfaces/example-gateway.interface";
import { ExampleEntity } from "./entities/example.entity";
import EventEmitter from "events";
import { ExampleCreatedEvent } from "./events/example-created.event";

// Puertos y adaptadores
@Injectable()
export class ExampleService {
  constructor(
    /* Proveer clase ExampleServiceHttpGateway como servicio */
    // @Inject("ProviderExampleServiceHttpGateway") private provider: ExampleGatewayInterface,

    /* Proveer clase ExampleServiceInMemoryGateway como servicio */
    @Inject("ProviderExampleServiceInMemoryGateway") private provider: ExampleGatewayInterface,

    /* Proveer clase ExampleServiceSequelizeGateway como servicio */
    // @Inject("ProviderExampleServiceSequelizeGateway") private provider: ExampleGatewayInterface,

    @Inject("ProviderEventEmitter") private eventEmitter: EventEmitter
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    Logger.log("[ExampleService.create]", { createExampleDto });

    // Crear
    const data = new ExampleEntity(createExampleDto);
    await this.provider.create(data);

    // Emitir evento
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(data));

    return {
      success: true,
      message: "example created",
      result: data
    };
  }

  async findAll() {
    Logger.log("[ExampleService.findAll]");

    const data = await this.provider.findAll();

    return {
      success: true,
      message: "get examples",
      result: data
    };
  }

  async findOne(id: number) {
    Logger.log("[ExampleService.findOne]", { id });

    const data = await this.provider.findById(id);

    return {
      success: true,
      message: "get example by id",
      result: data
    };
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    Logger.log("[ExampleService.update]", { id, updateExampleDto });

    // Actualizar
    await this.provider.update(id, updateExampleDto);

    // Emitir evento
    this.eventEmitter.emit("example.updated", new ExampleCreatedEvent(updateExampleDto));

    return {
      success: true,
      message: "example updated",
      result: { id, ...updateExampleDto }
    };
  }

  async delete(id: number) {
    Logger.log("[ExampleService.delete]", { id });

    await this.provider.delete(id);

    return {
      success: true,
      message: "example deleted",
      result: { id }
    };
  }
}
