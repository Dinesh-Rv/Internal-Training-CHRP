import { Stock, IStock } from '../models/Stock';
import { Product } from '../models/Product';
import { IStockService } from './IStockService';
import { ValidationError } from 'sequelize';

export class StockService implements IStockService {
  async createStock(stock: Omit<IStock, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<IStock> {
    // Business logic: product must exist
    const product = await Product.findByPk(stock.productId);
    if (!product) {
      throw new Error('Product does not exist');
    }
    try {
      const created = await Stock.create(stock);
      return created.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      throw err;
    }
  }

  async getStockById(id: number): Promise<IStock | null> {
    return Stock.findByPk(id);
  }

  async getAllStocks(): Promise<IStock[]> {
    return Stock.findAll();
  }

  async updateStock(id: number, updates: Partial<IStock>): Promise<IStock | null> {
    const stock = await Stock.findByPk(id);
    if (!stock) return null;
    if (updates.productId) {
      const product = await Product.findByPk(updates.productId);
      if (!product) {
        throw new Error('Product does not exist');
      }
    }
    try {
      await stock.update(updates);
      return stock.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      throw err;
    }
  }

  async deleteStock(id: number): Promise<boolean> {
    const stock = await Stock.findByPk(id);
    if (!stock) return false;
    await stock.destroy();
    return true;
  }
} 