import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExampleModel } from "./models/example.model";
import { ExampleGatewayHttp } from "./gateways/example-gateway-http";
import { ExampleGatewaySequelize } from "./gateways/example-gateway-sequelize";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { BullModule } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateExampleJob } from "./jobs/create-example.job";
import { ExampleCreatedListener } from "./listeners/example-created.listener";

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
    ExampleGatewaySequelize,
    ExampleGatewayHttp,
    ExampleCreatedListener,
    CreateExampleJob,
    {
      provide: "ProviderExamplePersistenceGateway",
      useExisting: ExampleGatewaySequelize
    },
    {
      provide: "ProviderExampleIntegrationGateway",
      useExisting: ExampleGatewayHttp
    },
    {
      provide: "ProviderEventEmitter",
      useExisting: EventEmitter2
    }
  ]
})
export class ExampleModule {}
