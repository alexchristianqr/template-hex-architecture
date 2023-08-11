import { ExampleEntity } from "../entities/example.entity";

export interface ExampleGatewayInterface {
  create(exampleEntity: ExampleEntity): Promise<ExampleEntity>;
  findAll(): Promise<ExampleEntity[]>;
  findById(id: number): Promise<ExampleEntity>;
}
