import { Module } from "./core";
import { ExampleModule } from "./examples/module/example.module";

@Module({
  imports: [ExampleModule]
})
export class AppModule {}
