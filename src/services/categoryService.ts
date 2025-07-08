import CategoryRepository from '../Repositories/CategoryRepository';

export class CategoryService {
  static async createCategory(data: {
    name: string;
    description?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }) {
    return CategoryRepository.create(data);
  }

  static async getAllCategories() {
    return CategoryRepository.findAll();
  }

  static async getCategoryById(id: number) {
    return CategoryRepository.findById(id);
  }

  static async updateCategory(id: number, data: Partial<{ name: string; description?: string; isActive?: boolean; isDeleted?: boolean; }>) {
    const category = await CategoryRepository.findByPk(id);
    if (!category || category.isDeleted) return null;
    await CategoryRepository.update(category, data);
    return category;
  }

  static async deleteCategory(id: number) {
    const category = await CategoryRepository.findByPk(id);
    if (!category || category.isDeleted) return null;
    await CategoryRepository.update(category, { isDeleted: true });
    return category;
  }
}

export default CategoryService;
