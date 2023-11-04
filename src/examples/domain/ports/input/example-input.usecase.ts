export abstract class ExampleInputUsecase {
  abstract create(data: any): Promise<any>
  abstract getAll(): Promise<any>
  abstract getById(id: number): Promise<any>
  abstract update(id: number, data: any): Promise<any>
  abstract delete(id: number): Promise<any>
}
