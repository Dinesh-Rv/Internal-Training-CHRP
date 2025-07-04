import request from 'supertest';
import app from '../src/app';
import * as categoryService from '../src/services/categoryService';

jest.mock('../src/services/categoryService');

const mockService = categoryService.CategoryService as jest.Mocked<typeof categoryService.CategoryService>;

describe('Category Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/categories - success', async () => {
    mockService.createCategory.mockResolvedValue({ id: 1, name: 'Test' } as any);
    const res = await request(app)
      .post('/api/categories')
      .send({ name: 'Test' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('POST /api/categories - missing name', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({});
    expect(res.status).toBe(400);
  });

  it('GET /api/categories - success', async () => {
    mockService.getAllCategories.mockResolvedValue([{ id: 1, name: 'Test' } as any]);
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/categories/:id - found', async () => {
    mockService.getCategoryById.mockResolvedValue({ id: 1, name: 'Test' } as any);
    const res = await request(app).get('/api/categories/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('GET /api/categories/:id - not found', async () => {
    mockService.getCategoryById.mockResolvedValue(null);
    const res = await request(app).get('/api/categories/999');
    expect(res.status).toBe(404);
  });
}); 