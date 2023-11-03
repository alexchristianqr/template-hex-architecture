import { Module } from "@nestjs/common"
import { ExampleModule } from "./examples/example.module"

@Module({
  imports: [ExampleModule]
})
export class AppModule {}
