import { ExampleEntity } from "../entities/example.entity";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { CreateExampleDto } from "../dto/create-example.dto";

export interface ExampleGatewayInterface {
  create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto>;
  findAll(): Promise<ExampleEntity[]>;
  findById(id: number): Promise<ExampleEntity>;
  update(id: number, updateExampleDto: UpdateExampleDto): Promise<void>;
  delete(id: number): Promise<void>;
}
