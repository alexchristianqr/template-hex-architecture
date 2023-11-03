export abstract class ExampleInputService {
  abstract create(data: any): Promise<any>
  abstract findAll(): Promise<any>
  abstract findById(id: number): Promise<any>
  abstract update(id: number, data: any): Promise<any>
  abstract delete(id: number): Promise<any>
}
