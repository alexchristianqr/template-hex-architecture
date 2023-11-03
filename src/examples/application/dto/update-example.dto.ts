import { PartialType } from "@nestjs/mapped-types"
import { ExampleEntity } from "../../domain/entities/example.entity"

export class UpdateExampleDto extends PartialType(ExampleEntity) {}
