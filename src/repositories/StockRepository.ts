import { Stock } from '../models/Stock';
import { BaseRepository } from './BaseRepository';
import { IStockRepository } from './IStockRepository';

export class StockRepository extends BaseRepository<Stock> implements IStockRepository {
  constructor() {
    super(Stock);
  }
  // Add stock-specific repository methods here if needed
} 