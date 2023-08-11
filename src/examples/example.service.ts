import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update-example.dto";
import { ExampleGatewayInterface } from "./gateways/example-gateway-interface";
import { ExampleEntity } from "./entities/example.entity";
import EventEmitter from "events";
import { ExampleCreatedEvent } from "./events/example-created.event";

// Puertos y adaptadores
@Injectable()
export class ExampleService {
  constructor(
    @Inject("ProviderExamplePersistenceGateway")
    private provider: ExampleGatewayInterface, // Proveer a ExampleGatewaySequelize
    @Inject("ProviderEventEmitter")
    private eventEmitter: EventEmitter
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    Logger.log("[ExampleService.create]");

    // Crear
    const exampleEntity = new ExampleEntity(createExampleDto.name);
    await this.provider.create(exampleEntity);

    // Emitir evento
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(exampleEntity));

    // Retornar entidad
    return exampleEntity;
  }

  findAll() {
    Logger.log("[ExampleService.findAll]");

    return this.provider.findAll();
  }

  async findOne(id: number) {
    Logger.log({ id });

    const list = await this.provider.findById(id);
    if (!list) {
      throw new Error("Example not found");
    }
    return list;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    console.log({ id, updateExampleDto });
    return `This action updates a #${id} list examples`;
  }

  remove(id: number) {
    console.log({ id });
    return `This action removes a #${id} list examples`;
  }
}
