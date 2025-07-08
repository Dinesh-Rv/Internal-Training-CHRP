import { RequestHandler } from 'express';
import { ProductService } from '../services/productService';
import logger from '../utils/logger';

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, categoryId, isActive } = req.body;
    if (!name || typeof name !== 'string') {
      res.status(400).json({ message: 'Name is required and must be a string.' });
      return;
    }
    if (typeof price !== 'number' || isNaN(price)) {
      res.status(400).json({ message: 'Price is required and must be a number.' });
      return;
    }
    if (!categoryId || typeof categoryId !== 'number') {
      res.status(400).json({ message: 'categoryId is required and must be a number.' });
      return;
    }
    const product = await ProductService.createProduct({ name, description, price, categoryId, isActive });
    logger.info(`Product created: ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    logger.error('Error creating product: %o', error);
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    logger.error('Error fetching products: %o', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid product ID.' });
      return;
    }
    const product = await ProductService.getProductById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json(product);
  } catch (error) {
    logger.error('Error fetching product: %o', error);
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid product ID.' });
      return;
    }
    const { name, description, price, categoryId, isActive } = req.body;
    const updated = await ProductService.updateProduct(id, { name, description, price, categoryId, isActive });
    if (!updated) {
      res.status(404).json({ message: 'Product not found or already deleted.' });
      return;
    }
    logger.info('Product updated: %o', updated);
    res.json(updated);
  } catch (error) {
    logger.error('Error updating product: %o', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid product ID.' });
      return;
    }
    const deleted = await ProductService.deleteProduct(id);
    if (!deleted) {
      res.status(404).json({ message: 'Product not found or already deleted.' });
      return;
    }
    logger.info('Product deleted: %o', deleted);
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    logger.error('Error deleting product: %o', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
}; 