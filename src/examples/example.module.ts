import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ExampleModel } from "./domain/models/example.model"
import { ExampleHttpRepository } from "./infrastructure/repositories/example-http.repository"
import { ExampleController } from "./application/controllers/example.controller"
import { ExampleService } from "./domain/services/example.service"
import { BullModule } from "@nestjs/bull"
import { EventEmitter2, EventEmitterModule } from "@nestjs/event-emitter"
import { CreateExampleJob } from "./domain/jobs/create-example.job"
import { ExampleCreatedListener } from "./domain/listeners/example-created.listener"
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
    HttpModule.register({}),
    BullModule.registerQueue({
      name: "default",
      defaultJobOptions: { attempts: 1 }
    })
  ],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    ExampleHttpRepository,
    ExampleCreatedListener,
    CreateExampleJob,
    {
      provide: "ProviderExampleRepository",
      useExisting: ExampleHttpRepository // ExampleInMemoryRepository, ExampleSequelizeRepository
    },
    {
      provide: "ProviderEventEmitter",
      useExisting: EventEmitter2
    }
  ]
})
export class ExampleModule {}
