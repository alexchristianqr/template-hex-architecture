import { ExampleEntity } from "../../entities/example.entity";
import { UpdateExampleDto } from "../../../application/dto/update-example.dto";
import { CreateExampleDto } from "../../../application/dto/create-example.dto";

export abstract class ExampleOutputRepository {
  abstract create(createExampleDto: CreateExampleDto): Promise<any>;
  abstract getAll(): Promise<Array<ExampleEntity>>;
  abstract getById(id: number): Promise<ExampleEntity>;
  abstract update(id: number, updateExampleDto: UpdateExampleDto): Promise<any>;
  abstract delete(id: number): Promise<any>;
}
