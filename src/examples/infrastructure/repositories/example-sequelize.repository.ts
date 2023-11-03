import { InjectModel } from "@nestjs/sequelize"
import { ExampleModel } from "../../domain/models/example.model"
import { ExampleOutputRepository } from "../../domain/ports/output/example-output.repository"
import { ExampleEntity } from "../../domain/entities/example.entity"
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common"
import { CreateExampleDto } from "../../application/dto/create-example.dto"
import { UpdateExampleDto } from "../../application/dto/update-example.dto"

@Injectable()
export class ExampleSequelizeRepository implements ExampleOutputRepository {
  constructor(@InjectModel(ExampleModel) private example: typeof ExampleModel) {}

  async create(createExampleDto: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleServiceSequelizeGateway.create]", createExampleDto)

    const newExample = await this.example.create(createExampleDto)
    createExampleDto.id = newExample.id // Set new ID

    return createExampleDto
  }

  async findAll(): Promise<Array<ExampleEntity>> {
    Logger.log("[ExampleServiceSequelizeGateway.findAll]")

    const examples = await this.example.findAll()
    return examples.map((item) => new ExampleEntity(item))
  }

  async findById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleServiceSequelizeGateway.findById]", { id })

    const example = await this.example.findByPk(id)
    if (!example) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST)

    return new ExampleEntity(example)
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleServiceSequelizeGateway.update]", { id, updateExampleDto })

    const exampleModel = await this.example.findByPk(id)
    if (!exampleModel) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST)

    return exampleModel.update(updateExampleDto)
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleServiceSequelizeGateway.delete]", { id })

    const exampleModel = await this.example.findByPk(id)
    if (!exampleModel) throw new HttpException("Example model not found", HttpStatus.BAD_REQUEST)

    return exampleModel.destroy()
  }
}
