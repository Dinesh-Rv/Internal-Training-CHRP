import Stock from '../models/Stock';

export class StockService {
  static async createStock(data: { productId: number; quantity: number }) {
    // Only one stock row per product
    const existingStock = await Stock.findOne({ where: { productId: data.productId } });
    if (existingStock) {
      const error: any = new Error('Stock already exists for this product.');
      error.status = 400;
      throw error;
    }
    return Stock.create(data);
  }

  static async getAllStocks() {
    return Stock.findAll({ include: ['product'] });
  }

  static async getStockById(id: number) {
    return Stock.findOne({ where: { id }, include: ['product'] });
  }

  static async updateStock(id: number, data: Partial<{ quantity: number }>) {
    const stock = await Stock.findByPk(id);
    if (!stock) return null;
    await stock.update(data);
    return stock;
  }

  static async deleteStock(id: number) {
    const stock = await Stock.findByPk(id);
    if (!stock) return null;
    await stock.destroy();
    return stock;
  }
}

export default StockService; 