import { PartialType } from "../../../core";
import { ExampleEntity } from "../../domain/entities/example.entity";

export class UpdateExampleDto extends PartialType(ExampleEntity) {}
