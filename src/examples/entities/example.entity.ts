import { CreateExampleDto } from "../dto/create-example.dto";
import { Logger } from "@nestjs/common";
import { UpdateExampleDto } from "../dto/update-example.dto";

export class ExampleEntity {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: ExampleEntity | UpdateExampleDto | CreateExampleDto) {
    Logger.log("[ExampleEntity.constructor]", { data });

    this.id = data?.id;
    this.name = data?.name;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }
}
