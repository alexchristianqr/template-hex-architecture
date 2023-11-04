import { Module, BullModule, HttpModule, EventEmitter2, EventEmitterModule, SequelizeModule } from "../core"
import { ExampleModel } from "./domain/models/example.model"
import { ExampleController } from "./application/controllers/example.controller"
import { ExampleService } from "./domain/services/example.service"
import { CreateExampleJob } from "./domain/jobs/create-example.job"
import { ExampleCreatedListener } from "./domain/listeners/example-created.listener"
import { ExampleLocalRepository } from "./infrastructure/repositories/example-local.repository"

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
      baseURL: "https://swapi.dev/api/"
    }),
    BullModule.registerQueue({
      name: "default",
      defaultJobOptions: { attempts: 1 }
    })
  ],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    ExampleLocalRepository,
    ExampleCreatedListener,
    CreateExampleJob,
    {
      provide: "ProviderExampleRepository",
      useExisting: ExampleLocalRepository // ExampleHttpRepository, ExampleInMemoryRepository, ExampleSequelizeRepository
    },
    {
      provide: "ProviderEventEmitter",
      useExisting: EventEmitter2
    }
  ]
})
export class ExampleModule {}
