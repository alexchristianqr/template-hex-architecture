import { Test, TestingModule } from "@nestjs/testing"
import { ExampleController } from "./example.controller"
import { ExampleService } from "../../domain/services/example.service"

describe("AppController", () => {
  let appController: ExampleController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService]
    }).compile()

    appController = app.get<ExampleController>(ExampleController)
  })

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAll()).toBe("Hello World!")
    })
  })
})
