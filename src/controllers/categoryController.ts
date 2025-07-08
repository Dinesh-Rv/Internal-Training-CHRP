import { RequestHandler } from 'express';
import { CategoryService } from '../services/categoryService';
import logger from '../utils/logger';

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name || typeof name !== 'string') {
      res.status(400).json({ message: 'Name is required and must be a string.' });
      return;
    }
    const category = await CategoryService.createCategory({ name, description, isActive });
    logger.info('Category created: %o', category.name);
    res.status(201).json(category);
  } catch (error) {
    logger.error('Error creating category: %o', error);
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    logger.error('Error fetching categories: %o', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const getCategoryById: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid category ID.' });
      return;
    }
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.json(category);
  } catch (error) {
    logger.error('Error fetching category: %o', error);
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid category ID.' });
      return;
    }
    const { name, description, isActive } = req.body;
    const updated = await CategoryService.updateCategory(id, { name, description, isActive });
    if (!updated) {
      res.status(404).json({ message: 'Category not found or already deleted.' });
      return;
    }
    logger.info('Category updated: %o', updated);
    res.json(updated);
  } catch (error) {
    logger.error('Error updating category: %o', error);
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid category ID.' });
      return;
    }
    const deleted = await CategoryService.deleteCategory(id);
    if (!deleted) {
      res.status(404).json({ message: 'Category not found or already deleted.' });
      return;
    }
    logger.info('Category deleted: %o', deleted);
    res.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    logger.error('Error deleting category: %o', error);
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
