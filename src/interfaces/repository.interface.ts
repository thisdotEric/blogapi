export interface IWrite<T> {
  create(newItem: T): Promise<T>;
  update(id: string, updatedItem: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
}
