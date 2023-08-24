import { CreateExampleDto } from "../dto/create-example.dto";
import { Logger } from "@nestjs/common";
import { UpdateExampleDto } from "../dto/update-example.dto";

export class ExampleEntity {
  id?: number;
  name?: string;
  created_at?: string;
  updated_at?: string;

  constructor(data: ExampleEntity | UpdateExampleDto | CreateExampleDto) {
    Logger.log("[ExampleEntity.constructor]", { data });

    this.id = data?.id;
    this.name = data?.name;
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
  }
}
