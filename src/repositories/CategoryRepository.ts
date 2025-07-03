import { Category } from '../models/Category';
import { BaseRepository } from './BaseRepository';
import { ICategoryRepository } from './ICategoryRepository';

export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository {
  constructor() {
    super(Category);
  }
  // Add category-specific repository methods here if needed
} 