import { PartialType } from "@nestjs/mapped-types";
import { ExampleEntity } from "../entities/example.entity";

export class UpdateExampleDto extends PartialType(ExampleEntity) {}
