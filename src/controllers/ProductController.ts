import { Request, Response } from 'express';
import { IProductService } from '../services/IProductService';

export class ProductController {
  constructor(private productService: IProductService) {}

  async createProduct(req: Request, res: Response) {
    const { name, price, categoryId } = req.body;
    if (!name || price === undefined || !categoryId) {
      return res.status(400).json({ message: 'name, price, and categoryId are required.' });
    }
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'price must be a non-negative number.' });
    }
    try {
      const product = await this.productService.createProduct({ name, price, categoryId });
      return res.status(201).json(product);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid product id.' });
    const product = await this.productService.getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json(product);
  }

  async getAllProducts(req: Request, res: Response) {
    const products = await this.productService.getAllProducts();
    return res.json(products);
  }

  async updateProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid product id.' });
    try {
      const product = await this.productService.updateProduct(id, req.body);
      if (!product) return res.status(404).json({ message: 'Product not found.' });
      return res.json(product);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid product id.' });
    const deleted = await this.productService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found.' });
    return res.status(204).send();
  }
} 