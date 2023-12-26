import { Logger } from "../../../core";

export class ExampleEntity {
  id?: number;
  name?: string;
  created_at?: string;
  updated_at?: string;

  constructor(data?: ExampleEntity) {
    Logger.log("[ExampleEntity.constructor]", { data });

    this.id = data?.id;
    this.name = data?.name;
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
  }
}
