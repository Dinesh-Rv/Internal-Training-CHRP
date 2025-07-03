import { Request, Response } from 'express';
import { ICategoryService } from '../services/ICategoryService';

export class CategoryController {
  constructor(private categoryService: ICategoryService) {}

  async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required.' });
    try {
      const category = await this.categoryService.createCategory({ name });
      return res.status(201).json(category);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid category id.' });
    const category = await this.categoryService.getCategoryById(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    return res.json(category);
  }

  async getAllCategories(req: Request, res: Response) {
    const categories = await this.categoryService.getAllCategories();
    return res.json(categories);
  }

  async updateCategory(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid category id.' });
    try {
      const category = await this.categoryService.updateCategory(id, req.body);
      if (!category) return res.status(404).json({ message: 'Category not found.' });
      return res.json(category);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid category id.' });
    const deleted = await this.categoryService.deleteCategory(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found.' });
    return res.status(204).send();
  }
} 