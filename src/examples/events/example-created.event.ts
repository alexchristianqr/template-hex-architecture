import { ExampleEntity } from "../entities/example.entity";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { CreateExampleDto } from "../dto/create-example.dto";

export class ExampleCreatedEvent {
  constructor(public exampleEntity: ExampleEntity | UpdateExampleDto | CreateExampleDto) {}
}
