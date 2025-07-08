import Category from '../src/models/Category';
import { CategoryRepository } from '../src/Repositories/CategoryRepository';

jest.mock('../src/models/Category');
const mockCategory = Category as jest.Mocked<typeof Category>;

describe('CategoryRepository', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create a category', async () => {
    mockCategory.create.mockResolvedValue({ id: 1, name: 'Test' } as any);
    const result = await CategoryRepository.create({ name: 'Test' });
    expect(result).toHaveProperty('id', 1);
    expect(mockCategory.create).toHaveBeenCalledWith({ name: 'Test' });
  });

  it('should find all categories', async () => {
    mockCategory.findAll.mockResolvedValue([{ id: 1, name: 'Test' } as any]);
    const result = await CategoryRepository.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(mockCategory.findAll).toHaveBeenCalledWith({ where: { isDeleted: false } });
  });

  it('should find a category by id', async () => {
    mockCategory.findOne.mockResolvedValue({ id: 1, name: 'Test' } as any);
    const result = await CategoryRepository.findById(1);
    expect(result).toHaveProperty('id', 1);
    expect(mockCategory.findOne).toHaveBeenCalledWith({ where: { id: 1, isDeleted: false } });
  });

  it('should find a category by pk', async () => {
    mockCategory.findByPk.mockResolvedValue({ id: 1, name: 'Test' } as any);
    const result = await CategoryRepository.findByPk(1);
    expect(result).toHaveProperty('id', 1);
    expect(mockCategory.findByPk).toHaveBeenCalledWith(1);
  });

  it('should update a category instance', async () => {
    const updateMock = jest.fn().mockResolvedValue({ id: 1, name: 'Updated' });
    const categoryInstance = {
      id: 1,
      name: 'Test',
      isActive: true,
      isDeleted: false,
      update: updateMock,
    } as unknown as Category;
    const result = await CategoryRepository.update(categoryInstance, { name: 'Updated' });
    expect(updateMock).toHaveBeenCalledWith({ name: 'Updated' });
    expect(result).toHaveProperty('id', 1);
  });
}); 