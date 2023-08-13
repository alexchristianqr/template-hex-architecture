import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ExampleEntity } from "../entities/example.entity";
import { lastValueFrom } from "rxjs";
import { ExampleGatewayInterface } from "../interfaces/example-gateway.interface";
import { UpdateExampleDto } from "../dto/update-example.dto";
import { CreateExampleDto } from "../dto/create-example.dto";

@Injectable()
export class ExampleServiceHttpGateway implements ExampleGatewayInterface {
  private baseUrl = `examples`;

  constructor(
    @Inject(HttpService)
    private httpService: HttpService
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto> {
    Logger.log("[ExampleGatewayHttp.create]", createExampleDto);

    await lastValueFrom(
      this.httpService.post("examples", {
        name: createExampleDto.name
      })
    );

    return createExampleDto;
  }

  async findAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleGatewayHttp.findAll]");

    const { data } = await lastValueFrom(this.httpService.get<any[]>(`${this.baseUrl}`));

    return data.map((item) => new ExampleEntity(item));
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleGatewayHttp.findById]", { id });

    const { data } = await lastValueFrom(this.httpService.get<any>(`${this.baseUrl}/${id}`));

    return new ExampleEntity(data);
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleGatewayHttp.update]", { id, updateExampleDto });

    return lastValueFrom(this.httpService.put<any>(`examples/${id}`));
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleGatewayHttp.delete]", { id });

    return lastValueFrom(this.httpService.delete<any>(`examples/${id}`));
  }
}
