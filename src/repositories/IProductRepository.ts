import { IProduct } from '../models/Product';
import { IBaseRepository } from './IBaseRepository';

export interface IProductRepository extends IBaseRepository<IProduct> {
  // Add product-specific repository methods here if needed
} 