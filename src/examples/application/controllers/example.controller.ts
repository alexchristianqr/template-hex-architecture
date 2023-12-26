import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, CoreService } from "../../../core";
import { ExampleService } from "../../domain/services/example.service";
import { CreateExampleDto } from "../dto/create-example.dto";
import { UpdateExampleDto } from "../dto/update-example.dto";

@Controller("examples")
export class ExampleController extends CoreService {
  constructor(private readonly exampleService: ExampleService) {
    super();
  }

  @Post()
  create(@Body() payload: CreateExampleDto) {
    Logger.log("[ExampleController.create]", { payload });

    try {
      return this.exampleService.createExample(payload);
    } catch (error) {
      return this.response.error.apiResponse({ error });
    }
  }

  @Get()
  getAll() {
    Logger.log("[ExampleController.findAll]");

    try {
      return this.exampleService.getExamples();
    } catch (error) {
      return this.response.error.apiResponse({ error });
    }
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    Logger.log("[ExampleController.findOne]", { id });

    try {
      return this.exampleService.getExampleById(parseInt(id));
    } catch (error) {
      return this.response.error.apiResponse({ error });
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() payload: UpdateExampleDto) {
    Logger.log("[ExampleController.update]", { id, payload });

    try {
      return this.exampleService.updateExample(parseInt(id), payload);
    } catch (error) {
      return this.response.error.apiResponse({ error });
    }
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    Logger.log("[ExampleController.delete]", { id });

    try {
      return this.exampleService.deleteExample(parseInt(id));
    } catch (error) {
      return this.response.error.apiResponse({ error });
    }
  }
}
