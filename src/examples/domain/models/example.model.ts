import { Column, Model, Table } from "../../../core";

interface IExample {
  name: string;
  age: string;
}

@Table({
  modelName: "examples"
})
export class ExampleModel extends Model<IExample> {
  @Column
  name: string;
}
