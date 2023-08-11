import { ExampleEntity } from "../entities/example.entity";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { Logger } from "@nestjs/common";
import { CreateExampleDto } from "../dto/create-example.dto";

export class ExampleGatewayInMemory implements ExampleGatewayInterface {
  items: ExampleEntity[] = [];

  async create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto> {
    Logger.log("[ExampleGatewayInMemory.create]", createExampleDto);

    createExampleDto.id = this.items.length + 1;
    this.items.push(createExampleDto);

    return createExampleDto;
  }

  async findAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleGatewayInMemory.findAll]");

    return this.items;
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleGatewayInMemory.findById]");

    const data = this.items.find((item) => item.id === id);
    if (!data) throw new Error("Example entity not found");

    return data;
  }

  delete(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(id: number, updateExampleDto: UpdateExampleDto): Promise<void> {
    return Promise.resolve(undefined);
  }
}
