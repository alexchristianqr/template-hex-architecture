import { CreateExampleDto } from "../dto/create-example.dto";
import { Logger } from "@nestjs/common";

export class ExampleEntity {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: CreateExampleDto | ExampleEntity) {
    Logger.log("[ExampleEntity.constructor]", { data });

    this.id = data?.id;
    this.name = data?.name;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
