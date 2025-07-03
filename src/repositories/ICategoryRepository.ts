import { ICategory } from '../models/Category';
import { IBaseRepository } from './IBaseRepository';

export interface ICategoryRepository extends IBaseRepository<ICategory> {
  // Add category-specific repository methods here if needed
} 