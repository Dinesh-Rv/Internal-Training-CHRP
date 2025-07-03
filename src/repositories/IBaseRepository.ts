export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(options?: PaginationOptions): Promise<T[]>;
  update(id: number, updates: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
} 