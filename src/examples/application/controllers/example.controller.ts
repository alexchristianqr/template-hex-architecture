import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "../../../core";
import { ExampleService } from "../../domain/services/example.service";
import { CreateExampleDto } from "../dto/create-example.dto";
import { UpdateExampleDto } from "../dto/update-example.dto";

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() payload: CreateExampleDto) {
    Logger.log("[ExampleController.create]", { payload });

    return this.exampleService.createExample(payload);
  }

  @Get()
  getAll() {
    Logger.log("[ExampleController.findAll]");

    return this.exampleService.getExamples();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    Logger.log("[ExampleController.findOne]", { id });

    return this.exampleService.getExampleById(parseInt(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() payload: UpdateExampleDto) {
    Logger.log("[ExampleController.update]", { id, payload });

    return this.exampleService.updateExample(parseInt(id), payload);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    Logger.log("[ExampleController.delete]", { id });

    return this.exampleService.deleteExample(parseInt(id));
  }
}
