import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Example } from "./entities/example.model";
import { ExampleGatewayHttp } from "./gateways/example-gateway-http";
import { ExampleGatewaySequelize } from "./gateways/example-gateway-sequelize";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
//import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { BullModule } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateExampleJob } from "./jobs/create-example.job";
import { PublishExampleCreatedListener } from "./listeners/publish-example-created.listener";

@Module({
  imports: [
    SequelizeModule.forFeature([Example]),
    HttpModule.register({
      baseURL: "http://localhost:8000",
    }),
    BullModule.registerQueue({
      name: "default",
      defaultJobOptions: { attempts: 1 },
    }),
  ],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    ExampleGatewaySequelize,
    ExampleGatewayHttp,
    //CreateListInCrmListener,
    PublishExampleCreatedListener,
    CreateExampleJob,
    {
      provide: "ListPersistenceGateway",
      useExisting: ExampleGatewaySequelize,
    },
    {
      provide: "ListIntegrationGateway",
      useExisting: ExampleGatewayHttp,
    },
    {
      provide: "EventEmitter",
      useExisting: EventEmitter2,
    },
  ],
})
export class ExampleModule {}
