import { Test, TestingModule, INestApplication } from "../src/core"
import * as request from "supertest"
import { configExampleModule } from "../src/examples/module/config.module"

describe(`ExampleModule (e2e)`, () => {
  let app: INestApplication
  let basePath = `/examples`

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(configExampleModule).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it(`${basePath} (GET)`, () => {
    return request(app.getHttpServer()).get(basePath).expect(200)
  })
})
