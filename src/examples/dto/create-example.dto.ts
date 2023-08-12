import { PartialType } from "@nestjs/mapped-types";
import { ExampleEntity } from "../entities/example.entity";
import { IsNotEmpty } from "class-validator";

export class CreateExampleDto extends PartialType(ExampleEntity) {
  @IsNotEmpty({
    message: "El campo [name] no puede estar vacío"
  })
  name?: string;
}
