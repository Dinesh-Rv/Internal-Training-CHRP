import { IStock } from '../models/Stock';

export interface IStockService {
  createStock(stock: Omit<IStock, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<IStock>;
  getStockById(id: number): Promise<IStock | null>;
  getAllStocks(): Promise<IStock[]>;
  updateStock(id: number, updates: Partial<IStock>): Promise<IStock | null>;
  deleteStock(id: number): Promise<boolean>;
} 