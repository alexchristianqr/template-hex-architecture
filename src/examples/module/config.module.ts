import { BullModule, EventEmitter2, EventEmitterModule, HttpModule, SequelizeModule } from "../../core";
import { ExampleModel } from "../domain/models/example.model";
import { ExampleController } from "../application/controllers/example.controller";
import { ExampleService } from "../domain/services/example.service";
import { ExampleLocalRepository } from "../infrastructure/repositories/example-local.repository";
import { ExampleCreatedListener } from "../infrastructure/listeners/example-created.listener";
import { CreateExampleJob } from "../domain/jobs/create-example.job";

export const configExampleModule = {
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
};
