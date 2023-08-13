import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExampleModel } from "./models/example.model";
import { ExampleServiceHttpGateway } from "./gateways/example-service-http.gateway";
import { ExampleServiceSequelizeGateway } from "./gateways/example-service-sequelize.gateway";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { BullModule } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateExampleJob } from "./jobs/create-example.job";
import { ExampleCreatedListener } from "./listeners/example-created.listener";
import { ExampleServiceInMemoryGateway } from "./gateways/example-service-in-memory.gateway";

@Module({
  imports: [
    SequelizeModule.forFeature([ExampleModel]),
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
    ExampleServiceSequelizeGateway,
    ExampleServiceInMemoryGateway,
    ExampleServiceHttpGateway,
    ExampleCreatedListener,
    CreateExampleJob,
    {
      provide: "ProviderExampleServiceInMemoryGateway",
      useExisting: ExampleServiceInMemoryGateway
    },
    {
      provide: "ProviderExampleServiceSequelizeGateway",
      useExisting: ExampleServiceSequelizeGateway
    },
    {
      provide: "ProviderExampleServiceHttpGateway",
      useExisting: ExampleServiceHttpGateway
    },
    {
      provide: "ProviderEventEmitter",
      useExisting: EventEmitter2
    }
  ]
})
export class ExampleModule {}
