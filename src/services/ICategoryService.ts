import { ICategory } from '../models/Category';

export interface ICategoryService {
  createCategory(category: Omit<ICategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<ICategory>;
  getCategoryById(id: number): Promise<ICategory | null>;
  getAllCategories(): Promise<ICategory[]>;
  updateCategory(id: number, updates: Partial<ICategory>): Promise<ICategory | null>;
  deleteCategory(id: number): Promise<boolean>;
} 