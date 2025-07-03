import { IProduct } from '../models/Product';

export interface IProductService {
  createProduct(product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<IProduct>;
  getProductById(id: number): Promise<IProduct | null>;
  getAllProducts(): Promise<IProduct[]>;
  updateProduct(id: number, updates: Partial<IProduct>): Promise<IProduct | null>;
  deleteProduct(id: number): Promise<boolean>;
} 