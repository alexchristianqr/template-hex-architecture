export abstract class ExampleInputUsecase {
  abstract createExample(data: any): Promise<any>;
  abstract getExamples(): Promise<any>;
  abstract getExampleById(id: number): Promise<any>;
  abstract updateExample(id: number, data: any): Promise<any>;
  abstract deleteExample(id: number): Promise<any>;
}
