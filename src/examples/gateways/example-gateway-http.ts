import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ExampleEntity } from "../entities/example.entity";
import { lastValueFrom } from "rxjs";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";

@Injectable()
export class ExampleGatewayHttp implements ExampleGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService
  ) {}

  async create(example: ExampleEntity): Promise<ExampleEntity> {
    await lastValueFrom(
      this.httpService.post("examples", {
        name: example.name
      })
    );
    return example;
  }

  async findAll(): Promise<ExampleEntity[]> {
    const { data } = await lastValueFrom(this.httpService.get<any[]>("examples"));
    return data.map((d) => new ExampleEntity(d.name, d.id));
  }

  async findById(id: number): Promise<ExampleEntity> {
    const { data } = await lastValueFrom(this.httpService.get<any>(`examples/${id}`));
    return new ExampleEntity(data.name, data.id);
  }
}
