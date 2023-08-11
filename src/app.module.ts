import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExampleModule } from "./examples/example.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { BullModule } from "@nestjs/bull";
import { ExampleModel } from "./examples/models/example.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    ExampleModule,
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: "sqlite",
      host: ":memory:",
      autoLoadModels: true,
      models: [ExampleModel]
    }),
    BullModule.forRoot({
      redis: {
        host: "redis",
        port: 6379
      }
    })
  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
