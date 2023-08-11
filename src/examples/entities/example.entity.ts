import { CreateExampleDto } from "../dto/create-example.dto";

export class ExampleEntity {
  id?: number;
  name: string;

  constructor(data: CreateExampleDto | ExampleEntity) {
    this.id = data?.id;
    this.name = data.name;
  }
}
