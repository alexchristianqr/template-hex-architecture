import { Test, TestingModule } from "@nestjs/testing";
import { ExampleController } from "./example.controller";
import { configExampleModule } from "../../module/config.module";

describe("ExampleController", () => {
  let appController: ExampleController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule(configExampleModule).compile();
    appController = app.get<ExampleController>(ExampleController);
  });

  it("appController.getAll()", async () => {
    const response = await appController.getAll();
    expect(response).toStrictEqual({ statusCode: 200, success: true, message: "get examples", result: [] });
  });

  afterEach(() => app.close());
});
