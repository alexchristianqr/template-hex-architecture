import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ExampleEntity } from "../entities/example.entity";
import { lastValueFrom } from "rxjs";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { CreateExampleDto } from "../dto/create-example.dto";

@Injectable()
export class ExampleServiceHttpGateway implements ExampleGatewayInterface {
  private url = `examples`;

  constructor(@Inject(HttpService) private httpService: HttpService) {}

  async create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto> {
    Logger.log("[ExampleGatewayHttp.create]", createExampleDto);

    const data = createExampleDto;
    await lastValueFrom(this.httpService.post(`${this.url}`, data));

    return data;
  }

  async findAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleGatewayHttp.findAll]");

    const { data } = await lastValueFrom(this.httpService.get<any[]>(`${this.url}`));

    return data.map((item) => new ExampleEntity(item));
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleGatewayHttp.findById]", { id });

    const { data } = await lastValueFrom(this.httpService.get<any>(`${this.url}/${id}`));

    return new ExampleEntity(data);
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleGatewayHttp.update]", { id, updateExampleDto });

    return lastValueFrom(this.httpService.put<any>(`${this.url}/${id}`));
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleGatewayHttp.delete]", { id });

    return lastValueFrom(this.httpService.delete<any>(`${this.url}/${id}`));
  }
}
