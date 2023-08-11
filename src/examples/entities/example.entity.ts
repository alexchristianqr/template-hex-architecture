import { CreateExampleDto } from "../dto/create-example.dto";

// type structure = {
//   id: number;
//   name: string;
// };

export class ExampleEntity {
  id?: number;
  name: string;

  constructor(data: CreateExampleDto | ExampleEntity) {
    this.id = data?.id;
    this.name = data.name;
  }
}
