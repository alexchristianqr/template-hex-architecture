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
    @Inject("ProviderExamplePersistenceGateway") private provider: ExampleGatewayInterface, // Proveer a ExampleGatewaySequelize
    @Inject("ProviderEventEmitter") private eventEmitter: EventEmitter
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    Logger.log("[ExampleService.create]");

    // Crear
    const exampleEntity = new ExampleEntity(createExampleDto);
    await this.provider.create(exampleEntity);

    // Emitir evento
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(exampleEntity));

    // Retornar entidad
    return exampleEntity;
  }

  async findAll() {
    Logger.log("[ExampleService.findAll]");

    const data = await this.provider.findAll();
    if (!data) throw new Error("Examples not found");

    return {
      success: true,
      message: `get table examples`,
      result: { data }
    };
  }

  async findOne(id: number) {
    Logger.log("[ExampleService.findOne]", { id });

    const data = await this.provider.findById(id);
    if (!data) throw new Error("Example not found");

    return {
      success: true,
      message: `get table examples by id`,
      result: { data }
    };
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    Logger.log("[ExampleService.update]", { id, updateExampleDto });

    await this.provider.update(id, updateExampleDto);
    // if (!data) throw new Error("Example not found");
    // const data = await this.provider.up(id);

    return {
      success: true,
      message: `updated table examples by id`,
      result: { id, updateExampleDto }
    };
  }

  async remove(id: number) {
    Logger.log("[ExampleService.remove]", { id });

    await this.provider.delete(id);

    return {
      success: true,
      message: `deleted table examples by id`,
      result: { id }
    };
  }
}
