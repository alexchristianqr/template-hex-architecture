import { InjectModel } from "@nestjs/sequelize";
import { ExampleModel } from "../models/example.model";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { ExampleEntity } from "../entities/example.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateExampleDto } from "../dto/create-example.dto";
import { UpdateExampleDto } from "../dto/update-example.dto";

@Injectable()
export class ExampleServiceSequelizeGateway implements ExampleGatewayInterface {
  constructor(@InjectModel(ExampleModel) private example: typeof ExampleModel) {}

  async create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto> {
    Logger.log("[ExampleGatewaySequelize.create]", createExampleDto);

    const newExample = await this.example.create(createExampleDto);
    createExampleDto.id = newExample.id; // Set new ID

    return createExampleDto;
  }

  async findAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleGatewaySequelize.findAll]");

    const examples = await this.example.findAll();
    return examples.map((item) => new ExampleEntity(item));
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleGatewaySequelize.findById]", { id });

    const example = await this.example.findByPk(id);
    if (!example) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST);

    return new ExampleEntity(example);
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleGatewaySequelize.update]", { id, updateExampleDto });

    const exampleModel = await this.example.findByPk(id);
    if (!exampleModel) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST);

    return exampleModel.update(updateExampleDto);
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleGatewaySequelize.delete]", { id });

    const exampleModel = await this.example.findByPk(id);
    if (!exampleModel) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST);

    return exampleModel.destroy();
  }
}
