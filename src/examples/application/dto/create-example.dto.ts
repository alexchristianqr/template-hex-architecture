import { PartialType, IsNotEmpty } from "../../../core"
import { ExampleEntity } from "../../domain/entities/example.entity"

export class CreateExampleDto extends PartialType(ExampleEntity) {
  @IsNotEmpty({
    message: "El campo [name] no puede estar vacío"
  })
  name?: string
}
