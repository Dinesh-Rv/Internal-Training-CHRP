import { CategoryService } from '../src/services/categoryService';
import Category from '../src/models/Category';

jest.mock('../src/models/Category');

const mockCategory = Category as jest.Mocked<typeof Category>;

describe('CategoryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a category', async () => {
    mockCategory.create.mockResolvedValue({ id: 1, name: 'Test', isActive: true, isDeleted: false } as any);
    const result = await CategoryService.createCategory({ name: 'Test' });
    expect(result).toHaveProperty('id', 1);
    expect(mockCategory.create).toHaveBeenCalledWith({ name: 'Test' });
  });

  it('should get all categories', async () => {
    mockCategory.findAll.mockResolvedValue([{ id: 1, name: 'Test', isActive: true, isDeleted: false } as any]);
    const result = await CategoryService.getAllCategories();
    expect(Array.isArray(result)).toBe(true);
    expect(mockCategory.findAll).toHaveBeenCalledWith({ where: { isDeleted: false } });
  });

  it('should get a category by id', async () => {
    mockCategory.findOne.mockResolvedValue({ id: 1, name: 'Test', isActive: true, isDeleted: false } as any);
    const result = await CategoryService.getCategoryById(1);
    expect(result).toHaveProperty('id', 1);
    expect(mockCategory.findOne).toHaveBeenCalledWith({ where: { id: 1, isDeleted: false } });
  });

  it('should update a category', async () => {
    const updateMock = jest.fn().mockResolvedValue(true);
    mockCategory.findByPk.mockResolvedValue({ id: 1, isDeleted: false, update: updateMock } as any);
    const result = await CategoryService.updateCategory(1, { name: 'Updated' });
    expect(updateMock).toHaveBeenCalledWith({ name: 'Updated' });
    expect(result).toHaveProperty('id', 1);
  });

  it('should return null when updating a non-existent category', async () => {
    mockCategory.findByPk.mockResolvedValue(null);
    const result = await CategoryService.updateCategory(999, { name: 'Updated' });
    expect(result).toBeNull();
  });

  it('should return null when updating a deleted category', async () => {
    mockCategory.findByPk.mockResolvedValue({ id: 1, isDeleted: true } as any);
    const result = await CategoryService.updateCategory(1, { name: 'Updated' });
    expect(result).toBeNull();
  });

  it('should soft delete a category', async () => {
    const updateMock = jest.fn().mockResolvedValue(true);
    mockCategory.findByPk.mockResolvedValue({ id: 1, isDeleted: false, update: updateMock } as any);
    const result = await CategoryService.deleteCategory(1);
    expect(updateMock).toHaveBeenCalledWith({ isDeleted: true });
    expect(result).toHaveProperty('id', 1);
  });

  it('should return null when deleting a non-existent category', async () => {
    mockCategory.findByPk.mockResolvedValue(null);
    const result = await CategoryService.deleteCategory(999);
    expect(result).toBeNull();
  });

  it('should return null when deleting an already deleted category', async () => {
    mockCategory.findByPk.mockResolvedValue({ id: 1, isDeleted: true } as any);
    const result = await CategoryService.deleteCategory(1);
    expect(result).toBeNull();
  });
}); 