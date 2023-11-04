import { Module } from "./core"
import { ExampleModule } from "./examples/example.module"

@Module({
  imports: [ExampleModule]
})
export class AppModule {}
