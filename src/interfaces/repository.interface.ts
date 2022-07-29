export interface IWrite<T> {
  create(newItem: T): Promise<T>;
  update(id: string, updatedItem: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  getAll(user_id: string): Promise<T[]>;
  get(id: string): Promise<T>;
}
