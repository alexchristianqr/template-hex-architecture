import { Inject, Injectable } from "@nestjs/common";
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
    @Inject("ListPersistenceGateway")
    private exampleGatewayInterface: ExampleGatewayInterface, //porta ListGatewaySequelize
    @Inject("EventEmitter")
    private eventEmitter: EventEmitter,
  ) {}

  async create(createExampleDto: CreateExampleDto) {
    const exampleEntity = new ExampleEntity(createExampleDto.name);
    await this.exampleGatewayInterface.create(exampleEntity);
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(exampleEntity));
    return exampleEntity;
  }

  findAll() {
    return this.exampleGatewayInterface.findAll();
  }

  async findOne(id: number) {
    const list = await this.exampleGatewayInterface.findById(id);
    if (!list) {
      throw new Error("List not found");
    }
    return list;
  }

  update(id: number, updateExampleDto: UpdateExampleDto) {
    console.log({ id, updateExampleDto });
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
