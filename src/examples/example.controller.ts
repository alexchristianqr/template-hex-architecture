import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "@nestjs/common";
import { ExampleService } from "./example.service";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update-example.dto";

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    Logger.log("[ExampleController.create]", { createExampleDto });

    return this.exampleService.create(createExampleDto);
  }

  @Get()
  findAll() {
    Logger.log("[ExampleController.findAll]");

    return this.exampleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    Logger.log("[ExampleController.findOne]", { id });

    return this.exampleService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateExampleDto: UpdateExampleDto) {
    Logger.log("[ExampleController.update]", { id, updateExampleDto });

    return this.exampleService.update(+id, updateExampleDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    Logger.log("[ExampleController.delete]", { id });

    return this.exampleService.delete(+id);
  }
}
