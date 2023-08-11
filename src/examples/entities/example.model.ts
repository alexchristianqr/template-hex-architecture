import { Column, Model, Table } from "sequelize-typescript";

export type ExampleAttributes = {
  name: string;
};

@Table
export class Example extends Model<ExampleAttributes> {
  @Column
  name: string;
}
