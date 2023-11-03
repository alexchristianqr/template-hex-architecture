import { HttpService } from "@nestjs/axios"
import { Inject, Injectable, Logger } from "@nestjs/common"
import { ExampleEntity } from "../../domain/entities/example.entity"
import { lastValueFrom } from "rxjs"
import { ExampleOutputRepository } from "../../domain/ports/output/example-output.repository"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"
import { CreateExampleDto } from "../../application/dto/create-example.dto"

@Injectable()
export class ExampleHttpRepository implements ExampleOutputRepository {
  private url = `examples`

  constructor(@Inject(HttpService) private httpService: HttpService) {}

  async create(createExampleDto: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleServiceHttpGateway.create]", createExampleDto)

    const url = `${this.url}`
    const data = createExampleDto
    await lastValueFrom(this.httpService.post(url, data))

    return data
  }

  async findAll(): Promise<Array<ExampleEntity>> {
    Logger.log("[ExampleServiceHttpGateway.findAll]")

    const url = `${this.url}`
    const { data } = await lastValueFrom(this.httpService.get<Array<any>>(url))

    return data.map((item) => new ExampleEntity(item))
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleServiceHttpGateway.findById]", { id })

    const url = `${this.url}/${id}`
    const { data } = await lastValueFrom(this.httpService.get<any>(url))

    return new ExampleEntity(data)
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleServiceHttpGateway.update]", { id, updateExampleDto })

    const url = `${this.url}/${id}`
    return lastValueFrom(this.httpService.put<any>(url))
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleServiceHttpGateway.delete]", { id })

    const url = `${this.url}/${id}`
    return lastValueFrom(this.httpService.delete<any>(url))
  }
}
