import { Inject, Injectable, Logger, CoreService } from "../../../core";
import EventEmitter from "events";
import { CreateExampleDto } from "../../application/dto/create-example.dto";
import { UpdateExampleDto } from "../../application/dto/update-example.dto";
import { ExampleOutputRepository } from "../ports/output/example-output.repository";
import { ExampleEntity } from "../entities/example.entity";
import { ExampleCreatedEvent } from "../events/example-created.event";
import { ExampleInputUsecase } from "../ports/input/example-input.usecase";

@Injectable()
export class ExampleService extends CoreService implements ExampleInputUsecase {
  constructor(
    @Inject("ProviderExampleRepository") private provider: ExampleOutputRepository,
    @Inject("ProviderEventEmitter") private eventEmitter: EventEmitter
  ) {
    super();
  }

  async createExample(payload: CreateExampleDto): Promise<any> {
    Logger.log("[ExampleService.createExample]", { payload });

    // Crear
    const data = new ExampleEntity(payload);
    await this.provider.create(data);

    // Emitir evento
    this.eventEmitter.emit("example.created", new ExampleCreatedEvent(payload));

    return this.response.send.apiResponse({ message: "example created", result: data });
  }

  async getExamples(): Promise<any> {
    Logger.log("[ExampleService.getExamples]");

    const data = await this.provider.getAll();

    return this.response.send.apiResponse({ status: 200, message: "get examples", result: data });
  }

  async getExampleById(id: number): Promise<any> {
    Logger.log("[ExampleService.getExampleById]", { id });

    const data = await this.provider.getById(id);

    return this.response.send.apiResponse({ message: "get example by id", result: data });
  }

  async updateExample(id: number, payload: UpdateExampleDto): Promise<any> {
    Logger.log("[ExampleService.updateExample]", { id, payload });

    // Actualizar
    const data = await this.provider.update(id, payload);

    // Emitir evento
    this.eventEmitter.emit("example.updated", new ExampleCreatedEvent(payload));

    return this.response.send.apiResponse({ message: "example updated", result: { id, ...data } });
  }

  async deleteExample(id: number): Promise<any> {
    Logger.log("[ExampleService.deleteExample]", { id });

    await this.provider.delete(id);

    return this.response.send.apiResponse({ message: "example deleted", result: { id } });
  }
}
