import { PartialType } from "@nestjs/mapped-types";
import { ExampleEntity } from "../entities/example.entity";

export class CreateExampleDto extends PartialType(ExampleEntity) {
  id?: number;
  name: string;
}
