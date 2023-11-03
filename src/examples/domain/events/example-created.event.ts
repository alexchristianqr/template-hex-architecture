import { ExampleEntity } from "../entities/example.entity"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"
import { CreateExampleDto } from "../../application/dto/create-example.dto"

export class ExampleCreatedEvent {
  constructor(public exampleEntity: ExampleEntity | UpdateExampleDto | CreateExampleDto) {}
}
