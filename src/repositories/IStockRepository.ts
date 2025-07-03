import { IStock } from '../models/Stock';
import { IBaseRepository } from './IBaseRepository';

export interface IStockRepository extends IBaseRepository<IStock> {
  // Add stock-specific repository methods here if needed
} 