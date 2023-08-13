import { ExampleEntity } from "../entities/example.entity";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { CreateExampleDto } from "../dto/create-example.dto";

export class ExampleServiceInMemoryGateway implements ExampleGatewayInterface {
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
    if (!data) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST);

    return data;
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleGatewayInMemory.update]", { id, updateExampleDto });

    let data = this.items.find((item) => item.id === id);
    if (!data) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST);
    data.name = updateExampleDto.name;
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleGatewayInMemory.delete]", { id });

    this.items = this.items.filter((item) => item.id !== id);
  }
}
