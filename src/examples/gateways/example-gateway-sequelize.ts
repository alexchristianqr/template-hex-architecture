import { InjectModel } from "@nestjs/sequelize";
import { ExampleModel } from "../models/example.model";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { ExampleEntity } from "../entities/example.entity";
import { Injectable, Logger } from "@nestjs/common";
import { CreateExampleDto } from "../dto/create-example.dto";
import { UpdateExampleDto } from "../dto/update-example.dto";

@Injectable()
export class ExampleGatewaySequelize implements ExampleGatewayInterface {
  constructor(@InjectModel(ExampleModel) private example: typeof ExampleModel) {}

  async create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto> {
    Logger.log("[ExampleGatewaySequelize.create]", createExampleDto);

    const newExample = await this.example.create(createExampleDto);
    createExampleDto.id = newExample.id;

    return createExampleDto;
  }

  async findAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleGatewaySequelize.findAll]");

    const listExamples = await this.example.findAll();

    return listExamples.map((item) => new ExampleEntity(item));
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleGatewaySequelize.findById]", { id });

    const exampleModel = await this.example.findByPk(id);
    if (!exampleModel) throw new Error("Example entity not found");

    return new ExampleEntity(exampleModel);
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<void> {
    Logger.log("[ExampleGatewaySequelize.update]", { id });

    const exampleModel = await this.example.findByPk(id);
    if (!exampleModel) throw new Error("Example entity not found");

    await exampleModel.update(updateExampleDto);
  }

  async delete(id: number): Promise<void> {
    Logger.log("[ExampleGatewaySequelize.delete]", { id });

    const exampleModel = await this.example.findByPk(id);
    if (!exampleModel) throw new Error("Example entity not found");

    await exampleModel.destroy();
  }
}
