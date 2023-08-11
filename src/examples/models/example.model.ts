import { Column, Model, Table } from "sequelize-typescript";

export type ExampleAttributes = {
  name: string;
};

@Table({
  modelName: "examples"
})
export class ExampleModel extends Model<ExampleAttributes> {
  @Column
  name: string;
}
