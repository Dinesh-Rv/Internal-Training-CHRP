import { RequestHandler } from 'express';
import { StockService } from '../services/stockService';
import logger from '../utils/logger';

export const createStock: RequestHandler = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || typeof productId !== 'number') {
      res.status(400).json({ message: 'productId is required and must be a number.' });
      return;
    }
    if (typeof quantity !== 'number' || isNaN(quantity)) {
      res.status(400).json({ message: 'quantity is required and must be a number.' });
      return;
    }
    const stock = await StockService.createStock({ productId, quantity });
    logger.info(`Stock created for productId: ${stock.productId}`);
    res.status(201).json(stock);
  } catch (error) {
    logger.error('Error creating stock: %o', error);
    res.status(500).json({ message: 'Error creating stock', error });
  }
};

export const getAllStocks: RequestHandler = async (req, res) => {
  try {
    const stocks = await StockService.getAllStocks();
    res.json(stocks);
  } catch (error) {
    logger.error('Error fetching stocks: %o', error);
    res.status(500).json({ message: 'Error fetching stocks', error });
  }
};

export const getStockById: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid stock ID.' });
      return;
    }
    const stock = await StockService.getStockById(id);
    if (!stock) {
      res.status(404).json({ message: 'Stock not found.' });
      return;
    }
    res.json(stock);
  } catch (error) {
    logger.error('Error fetching stock: %o', error);
    res.status(500).json({ message: 'Error fetching stock', error });
  }
};

export const updateStock: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid stock ID.' });
      return;
    }
    const { quantity } = req.body;
    const updated = await StockService.updateStock(id, { quantity });
    if (!updated) {
      res.status(404).json({ message: 'Stock not found.' });
      return;
    }
    logger.info('Stock updated: %o', updated);
    res.json(updated);
  } catch (error) {
    logger.error('Error updating stock: %o', error);
    res.status(500).json({ message: 'Error updating stock', error });
  }
};

export const deleteStock: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid stock ID.' });
      return;
    }
    const deleted = await StockService.deleteStock(id);
    if (!deleted) {
      res.status(404).json({ message: 'Stock not found.' });
      return;
    }
    logger.info('Stock deleted: %o', deleted);
    res.json({ message: 'Stock deleted successfully.' });
  } catch (error) {
    logger.error('Error deleting stock: %o', error);
    res.status(500).json({ message: 'Error deleting stock', error });
  }
}; 