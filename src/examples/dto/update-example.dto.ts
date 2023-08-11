import { PartialType } from "@nestjs/mapped-types";
import { ExampleEntity } from "../entities/example.entity";
import { IsNotEmpty } from "class-validator";

export class UpdateExampleDto extends PartialType(ExampleEntity) {}
