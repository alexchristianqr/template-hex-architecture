import { ExampleEntity } from "../entities/example.entity";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { CreateExampleDto } from "../dto/create-example.dto";

export interface ExampleGatewayInterface {
  create(createExampleDto: CreateExampleDto): Promise<any>;
  findAll(): Promise<Array<ExampleEntity>>;
  findById(id: number): Promise<ExampleEntity>;
  update(id: number, updateExampleDto: UpdateExampleDto): Promise<any>;
  delete(id: number): Promise<any>;
}
