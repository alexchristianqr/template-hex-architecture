import { HttpService, Inject, Injectable, Logger, catchError, firstValueFrom, lastValueFrom } from "../../../core"
import { ExampleEntity } from "../../domain/entities/example.entity"
import { ExampleOutputRepository } from "../../domain/ports/output/example-output.repository"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"
import { CreateExampleDto } from "../../application/dto/create-example.dto"

@Injectable()
export class ExampleHttpRepository implements ExampleOutputRepository {
  private url = `people`

  constructor(@Inject(HttpService) private httpService: HttpService) {}

  async create(createExampleDto: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleHttpRepository.create]", createExampleDto)

    const url = `${this.url}`
    const data = createExampleDto
    await lastValueFrom(this.httpService.post(url, data))

    return data
  }

  async getAll(): Promise<Array<ExampleEntity>> {
    Logger.log("[ExampleHttpRepository.getAll]")

    const url = `${this.url}`
    const { data } = await firstValueFrom(
      this.httpService.get<Array<any>>(url).pipe(
        catchError((error: any) => {
          Logger.error(error.response.data)
          throw "Ha ocurrido un error"
        })
      )
    )

    return data
  }

  async getById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleHttpRepository.getById]", { id })

    const url = `${this.url}/${id}`
    const { data } = await lastValueFrom(this.httpService.get<any>(url))

    return new ExampleEntity(data)
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleHttpRepository.update]", { id, updateExampleDto })

    const url = `${this.url}/${id}`
    return lastValueFrom(this.httpService.put<any>(url))
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleHttpRepository.delete]", { id })

    const url = `${this.url}/${id}`
    return lastValueFrom(this.httpService.delete<any>(url))
  }
}
