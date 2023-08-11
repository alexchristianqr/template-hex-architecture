import { InjectModel } from "@nestjs/sequelize";
import { ExampleModel } from "../models/example.model";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { ExampleEntity } from "../entities/example.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExampleGatewaySequelize implements ExampleGatewayInterface {
  constructor(
    @InjectModel(ExampleModel)
    private example: typeof ExampleModel
  ) {}

  async create(exampleEntity: ExampleEntity): Promise<ExampleEntity> {
    const newExample = await this.example.create(exampleEntity);
    exampleEntity.id = newExample.id;
    return exampleEntity;
  }

  async findAll(): Promise<ExampleEntity[]> {
    const listExample = await this.example.findAll();
    return listExample.map((item) => new ExampleEntity(item.name, item.id));
  }

  async findById(id: number): Promise<ExampleEntity> {
    const exampleModel = await this.example.findByPk(id);
    if (!exampleModel) {
      throw new Error("Example entity not found");
    }
    return new ExampleEntity(exampleModel.name, exampleModel.id);
  }
}
