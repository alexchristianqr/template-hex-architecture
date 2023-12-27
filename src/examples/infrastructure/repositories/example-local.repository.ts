import { HttpStatus, Injectable, Logger, CustomHttpExceptionService } from "../../../core";
import { ExampleEntity } from "../../domain/entities/example.entity";
import { ExampleOutputRepository } from "../../domain/ports/output/example-output.repository";
import { UpdateExampleDto } from "../../application/dto/update-example.dto";
import { CreateExampleDto } from "../../application/dto/create-example.dto";

@Injectable()
export class ExampleLocalRepository implements ExampleOutputRepository {
  items: Array<ExampleEntity> = [];

  async create(createExampleDto: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleLocalRepository.create]", createExampleDto);

    createExampleDto.id = this.items.length + 1;
    this.items.push(createExampleDto);

    return createExampleDto;
  }

  async getAll(): Promise<ExampleEntity[]> {
    Logger.log("[ExampleLocalRepository.getAll]");

    if (this.items.length < 1) throw new CustomHttpExceptionService("Examples not loaded", HttpStatus.BAD_REQUEST);
    return this.items;
  }

  async getById(id: number): Promise<ExampleEntity> {
    Logger.log("[ExampleLocalRepository.getById]");

    const data = this.items.find((item) => item.id === id);
    if (!data) throw new CustomHttpExceptionService("Example model not found", HttpStatus.BAD_REQUEST);

    return data;
  }

  async update(id: number, updateExampleDto: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleLocalRepository.update]", { id, updateExampleDto });

    const data = this.items.find((item) => item.id === id);
    if (!data) throw new CustomHttpExceptionService("Example model not found", HttpStatus.BAD_REQUEST);
    data.name = updateExampleDto.name;
  }

  async delete(id: number): Promise<any> {
    Logger.log("[ExampleLocalRepository.delete]", { id });

    this.items = this.items.filter((item) => item.id !== id);
  }
}
