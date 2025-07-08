import * as categoryService from '../src/services/categoryService';
import * as categoryController from '../src/controllers/categoryController';

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe('CategoryController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a category and return 201', async () => {
    jest.spyOn(categoryService.CategoryService, 'createCategory').mockResolvedValue({ id: 1, name: 'Test' } as any);
    const req: any = { body: { name: 'Test' } };
    const res = mockRes();
    await categoryController.createCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test' });
  });

  it('should return 400 if name is missing', async () => {
    const req: any = { body: {} };
    const res = mockRes();
    await categoryController.createCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should handle service error and return 500 (create)', async () => {
    jest.spyOn(categoryService.CategoryService, 'createCategory').mockRejectedValue(new Error('fail'));
    const req: any = { body: { name: 'Test' } };
    const res = mockRes();
    await categoryController.createCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should get all categories', async () => {
    jest.spyOn(categoryService.CategoryService, 'getAllCategories').mockResolvedValue([{ id: 1, name: 'Test' } as any]);
    const req: any = {};
    const res = mockRes();
    await categoryController.getAllCategories(req, res, next);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Test' }]);
  });

  it('should handle service error and return 500 (getAll)', async () => {
    jest.spyOn(categoryService.CategoryService, 'getAllCategories').mockRejectedValue(new Error('fail'));
    const req: any = {};
    const res = mockRes();
    await categoryController.getAllCategories(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should get a category by id', async () => {
    jest.spyOn(categoryService.CategoryService, 'getCategoryById').mockResolvedValue({ id: 1, name: 'Test' } as any);
    const req: any = { params: { id: '1' } };
    const res = mockRes();
    await categoryController.getCategoryById(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test' });
  });

  it('should return 400 for invalid id (getCategoryById)', async () => {
    const req: any = { params: { id: 'abc' } };
    const res = mockRes();
    await categoryController.getCategoryById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return 404 if category not found (getCategoryById)', async () => {
    jest.spyOn(categoryService.CategoryService, 'getCategoryById').mockResolvedValue(null);
    const req: any = { params: { id: '999' } };
    const res = mockRes();
    await categoryController.getCategoryById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should handle service error and return 500 (getCategoryById)', async () => {
    jest.spyOn(categoryService.CategoryService, 'getCategoryById').mockRejectedValue(new Error('fail'));
    const req: any = { params: { id: '1' } };
    const res = mockRes();
    await categoryController.getCategoryById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should update a category', async () => {
    jest.spyOn(categoryService.CategoryService, 'updateCategory').mockResolvedValue({ id: 1, name: 'Updated' } as any);
    const req: any = { params: { id: '1' }, body: { name: 'Updated' } };
    const res = mockRes();
    await categoryController.updateCategory(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated' });
  });

  it('should return 400 for invalid id (updateCategory)', async () => {
    const req: any = { params: { id: 'abc' }, body: { name: 'Updated' } };
    const res = mockRes();
    await categoryController.updateCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return 404 if category not found or deleted (updateCategory)', async () => {
    jest.spyOn(categoryService.CategoryService, 'updateCategory').mockResolvedValue(null);
    const req: any = { params: { id: '999' }, body: { name: 'Updated' } };
    const res = mockRes();
    await categoryController.updateCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should handle service error and return 500 (updateCategory)', async () => {
    jest.spyOn(categoryService.CategoryService, 'updateCategory').mockRejectedValue(new Error('fail'));
    const req: any = { params: { id: '1' }, body: { name: 'Updated' } };
    const res = mockRes();
    await categoryController.updateCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should delete a category', async () => {
    jest.spyOn(categoryService.CategoryService, 'deleteCategory').mockResolvedValue({ id: 1 } as any);
    const req: any = { params: { id: '1' } };
    const res = mockRes();
    await categoryController.deleteCategory(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully.' });
  });

  it('should return 400 for invalid id (deleteCategory)', async () => {
    const req: any = { params: { id: 'abc' } };
    const res = mockRes();
    await categoryController.deleteCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return 404 if category not found or deleted (deleteCategory)', async () => {
    jest.spyOn(categoryService.CategoryService, 'deleteCategory').mockResolvedValue(null);
    const req: any = { params: { id: '999' } };
    const res = mockRes();
    await categoryController.deleteCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should handle service error and return 500 (deleteCategory)', async () => {
    jest.spyOn(categoryService.CategoryService, 'deleteCategory').mockRejectedValue(new Error('fail'));
    const req: any = { params: { id: '1' } };
    const res = mockRes();
    await categoryController.deleteCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  });
}); 