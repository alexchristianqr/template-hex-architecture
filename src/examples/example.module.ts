import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ExampleModel } from "./domain/models/example.model"
import { ExampleHttpRepository } from "./infrastructure/repositories/example-http.repository"
import { ExampleSequelizeRepository } from "./infrastructure/repositories/example-sequelize.repository"
import { ExampleController } from "./application/controllers/example.controller"
import { ExampleService } from "./domain/services/example.service"
import { BullModule } from "@nestjs/bull"
import { EventEmitter2, EventEmitterModule } from "@nestjs/event-emitter"
import { CreateExampleJob } from "./domain/jobs/create-example.job"
import { ExampleCreatedListener } from "./domain/listeners/example-created.listener"
import { ExampleInMemoryRepository } from "./infrastructure/repositories/example-in-memory.repository"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [
    SequelizeModule.forFeature([ExampleModel]),
    SequelizeModule.forRoot({
      dialect: "sqlite",
      host: ":memory:",
      autoLoadModels: true
    }),
    EventEmitterModule.forRoot(),

    HttpModule.register({
      baseURL: "http://localhost:8000"
    }),
    BullModule.registerQueue({
      name: "default",
      defaultJobOptions: { attempts: 1 }
    })
  ],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    ExampleSequelizeRepository,
    ExampleInMemoryRepository,
    ExampleHttpRepository,
    ExampleCreatedListener,
    CreateExampleJob,
    {
      provide: "ProviderExampleServiceInMemoryGateway",
      useExisting: ExampleInMemoryRepository
    },
    {
      provide: "ProviderExampleServiceSequelizeGateway",
      useExisting: ExampleSequelizeRepository
    },
    {
      provide: "ProviderExampleServiceHttpGateway",
      useExisting: ExampleHttpRepository
    },
    {
      provide: "ProviderEventEmitter",
      useExisting: EventEmitter2
    }
  ]
})
export class ExampleModule {}
