import { Request, Response } from 'express';
import { IStockService } from '../services/IStockService';

export class StockController {
  constructor(private stockService: IStockService) {}

  async createStock(req: Request, res: Response) {
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'productId and quantity are required.' });
    }
    if (typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ message: 'quantity must be a non-negative number.' });
    }
    try {
      const stock = await this.stockService.createStock({ productId, quantity });
      return res.status(201).json(stock);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getStockById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid stock id.' });
    const stock = await this.stockService.getStockById(id);
    if (!stock) return res.status(404).json({ message: 'Stock not found.' });
    return res.json(stock);
  }

  async getAllStocks(req: Request, res: Response) {
    const stocks = await this.stockService.getAllStocks();
    return res.json(stocks);
  }

  async updateStock(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid stock id.' });
    try {
      const stock = await this.stockService.updateStock(id, req.body);
      if (!stock) return res.status(404).json({ message: 'Stock not found.' });
      return res.json(stock);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteStock(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid stock id.' });
    const deleted = await this.stockService.deleteStock(id);
    if (!deleted) return res.status(404).json({ message: 'Stock not found.' });
    return res.status(204).send();
  }
} 