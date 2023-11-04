import { HttpException, HttpStatus, Injectable, Logger } from "../../../core"
import { ExampleEntity } from "../../domain/entities/example.entity"
import { ExampleOutputRepository } from "../../domain/ports/output/example-output.repository"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"
import { CreateExampleDto } from "../../application/dto/create-example.dto"

@Injectable()
export class ExampleLocalRepository implements ExampleOutputRepository {
  items: Array<ExampleEntity> = []

  async create(createExampleDto: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleLocalRepository.create]", createExampleDto)

    createExampleDto.id = this.items.length + 1
    this.items.push(createExampleDto)

    return createExampleDto
  }

  async findAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleLocalRepository.findAll]")

    return this.items
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleLocalRepository.findById]")

    const data = this.items.find((item) => item.id === id)
    if (!data) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST)

    return data
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleLocalRepository.update]", { id, updateExampleDto })

    let data = this.items.find((item) => item.id === id)
    if (!data) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST)
    data.name = updateExampleDto.name
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleLocalRepository.delete]", { id })

    this.items = this.items.filter((item) => item.id !== id)
  }
}
