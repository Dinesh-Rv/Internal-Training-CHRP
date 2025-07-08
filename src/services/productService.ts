import Product from '../models/Product';
import Stock from '../models/Stock';
import logger from '../utils/logger';

export class ProductService {
  static async createProduct(data: {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
    isActive?: boolean;
    isDeleted?: boolean;
  }) {
    const product = await Product.create(data);
    // Create stock with quantity 0 if not exists
    const existingStock = await Stock.findOne({ where: { productId: product.id } });
    if (!existingStock) {
      const stock = await Stock.create({ productId: product.id, quantity: 0 });
      logger.info(`Stock for productId ${product.id} set to default quantity: ${stock.quantity}`);
    }
    return product;
  }

  static async getAllProducts() {
    return Product.findAll({ where: { isDeleted: false }, include: ['category'] });
  }

  static async getProductById(id: number) {
    return Product.findOne({ where: { id, isDeleted: false }, include: ['category'] });
  }

  static async updateProduct(id: number, data: Partial<{ name: string; description?: string; price?: number; categoryId?: number; isActive?: boolean; isDeleted?: boolean; }>) {
    const product = await Product.findByPk(id);
    if (!product || product.isDeleted) return null;
    await product.update(data);
    return product;
  }

  static async deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    if (!product || product.isDeleted) return null;
    await product.update({ isDeleted: true });
    return product;
  }
}

export default ProductService; 