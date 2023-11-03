import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "@nestjs/common"
import { ExampleService } from "../../domain/services/example.service"
import { CreateExampleDto } from "../dto/create-example.dto"
import { UpdateExampleDto } from "../dto/update-example.dto"

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    Logger.log("[ExampleController.create]", { createExampleDto })

    try {
      return this.exampleService.create(createExampleDto)
    } catch (e) {
      console.error(e)
    }
  }

  @Get()
  findAll() {
    Logger.log("[ExampleController.findAll]")

    try {
      return this.exampleService.findAll()
    } catch (e) {
      console.error(e)
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    Logger.log("[ExampleController.findOne]", { id })

    try {
      return this.exampleService.findById(parseInt(id))
    } catch (e) {
      console.error(e)
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateExampleDto: UpdateExampleDto) {
    Logger.log("[ExampleController.update]", { id, updateExampleDto })

    try {
      return this.exampleService.update(+id, updateExampleDto)
    } catch (e) {
      console.error(e)
    }
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    Logger.log("[ExampleController.delete]", { id })

    try {
      return this.exampleService.delete(parseInt(id))
    } catch (e) {
      console.error(e)
    }
  }
}
