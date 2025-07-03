import { Product } from '../models/Product';
import { BaseRepository } from './BaseRepository';
import { IProductRepository } from './IProductRepository';

export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
  constructor() {
    super(Product);
  }
  // Add product-specific repository methods here if needed
} 