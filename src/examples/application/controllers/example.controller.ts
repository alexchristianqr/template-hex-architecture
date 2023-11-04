import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "../../../core"
import { ExampleService } from "../../domain/services/example.service"
import { CreateExampleDto } from "../dto/create-example.dto"
import { UpdateExampleDto } from "../dto/update-example.dto"

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() payload: CreateExampleDto) {
    Logger.log("[ExampleController.create]", { payload })

    try {
      return this.exampleService.create(payload)
    } catch (e) {
      console.error(e)
    }
  }

  @Get()
  getAll() {
    Logger.log("[ExampleController.findAll]")

    try {
      return this.exampleService.getAll()
    } catch (e) {
      console.error(e)
    }
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    Logger.log("[ExampleController.findOne]", { id })

    try {
      return this.exampleService.getById(parseInt(id))
    } catch (e) {
      console.error(e)
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() payload: UpdateExampleDto) {
    Logger.log("[ExampleController.update]", { id, payload })

    try {
      return this.exampleService.update(parseInt(id), payload)
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
