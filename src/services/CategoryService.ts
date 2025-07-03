import { Category, ICategory } from '../models/Category';
import { ICategoryService } from './ICategoryService';
import { ValidationError } from 'sequelize';

export class CategoryService implements ICategoryService {
  async createCategory(category: Omit<ICategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<ICategory> {
    try {
      const created = await Category.create(category);
      return created.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Category name already exists');
      }
      throw err;
    }
  }

  async getCategoryById(id: number): Promise<ICategory | null> {
    return Category.findByPk(id);
  }

  async getAllCategories(): Promise<ICategory[]> {
    return Category.findAll();
  }

  async updateCategory(id: number, updates: Partial<ICategory>): Promise<ICategory | null> {
    const category = await Category.findByPk(id);
    if (!category) return null;
    try {
      await category.update(updates);
      return category.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      throw err;
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await Category.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
  }
} 