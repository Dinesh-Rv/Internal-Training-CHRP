import { Product, IProduct } from '../models/Product';
import { Category } from '../models/Category';
import { IProductService } from './IProductService';
import { ValidationError } from 'sequelize';

export class ProductService implements IProductService {
  async createProduct(product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<IProduct> {
    // Business logic: category must exist
    const category = await Category.findByPk(product.categoryId);
    if (!category) {
      throw new Error('Category does not exist');
    }
    try {
      const created = await Product.create(product);
      return created.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      throw err;
    }
  }

  async getProductById(id: number): Promise<IProduct | null> {
    return Product.findByPk(id);
  }

  async getAllProducts(): Promise<IProduct[]> {
    return Product.findAll();
  }

  async updateProduct(id: number, updates: Partial<IProduct>): Promise<IProduct | null> {
    const product = await Product.findByPk(id);
    if (!product) return null;
    if (updates.categoryId) {
      const category = await Category.findByPk(updates.categoryId);
      if (!category) {
        throw new Error('Category does not exist');
      }
    }
    try {
      await product.update(updates);
      return product.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      throw err;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await Product.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
  }
} 