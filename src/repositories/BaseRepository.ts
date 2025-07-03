import { Model, FindOptions } from 'sequelize';
import { IBaseRepository, PaginationOptions } from './IBaseRepository';

export class BaseRepository<T extends Model> implements IBaseRepository<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const instance = await this.model.create(data);
    return instance;
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(options?: PaginationOptions): Promise<T[]> {
    const findOptions: FindOptions = {};
    if (options?.limit !== undefined) findOptions.limit = options.limit;
    if (options?.offset !== undefined) findOptions.offset = options.offset;
    return this.model.findAll(findOptions);
  }

  async update(id: number, updates: Partial<T>): Promise<T | null> {
    const instance = await this.model.findByPk(id);
    if (!instance) return null;
    await instance.update(updates);
    return instance;
  }

  async delete(id: number): Promise<boolean> {
    const instance = await this.model.findByPk(id);
    if (!instance) return false;
    await instance.destroy();
    return true;
  }
} 