import { ExampleEntity } from "../entities/example.entity";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";

export class ExampleGatewayInMemory implements ExampleGatewayInterface {
  items: ExampleEntity[] = [];

  async create(list: ExampleEntity): Promise<ExampleEntity> {
    list.id = this.items.length + 1;
    this.items.push(list);
    return list;
  }

  async findAll(): Promise<ExampleEntity[]> {
    return this.items;
  }

  async findById(id: number): Promise<ExampleEntity> {
    const list = this.items.find((item) => item.id === id);
    if (!list) {
      throw new Error("Example entity not found");
    }
    return list;
  }
}
