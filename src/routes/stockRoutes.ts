import { Router } from 'express';
import {
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
} from '../controllers/stockController';

const router = Router();

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all stock records
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: List of stock records
 *       500:
 *         description: Server error
 */
router.get('/', getAllStocks);

/**
 * @swagger
 * /api/stocks/{id}:
 *   get:
 *     summary: Get a stock record by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock found
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getStockById);

/**
 * @swagger
 * /api/stocks/{id}:
 *   put:
 *     summary: Update a stock record by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stock updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     summary: Delete a stock record by ID
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteStock);

export default router; 