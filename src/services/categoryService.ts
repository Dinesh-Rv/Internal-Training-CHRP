import Category from '../models/Category';

export class CategoryService {
  static async createCategory(data: {
    name: string;
    description?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }) {
    return Category.create(data);
  }

  static async getAllCategories() {
    return Category.findAll({ where: { isDeleted: false } });
  }

  static async getCategoryById(id: number) {
    return Category.findOne({ where: { id, isDeleted: false } });
  }

  static async updateCategory(id: number, data: Partial<{ name: string; description?: string; isActive?: boolean; isDeleted?: boolean; }>) {
    const category = await Category.findByPk(id);
    if (!category || category.isDeleted) return null;
    await category.update(data);
    return category;
  }

  static async deleteCategory(id: number) {
    const category = await Category.findByPk(id);
    if (!category || category.isDeleted) return null;
    await category.update({ isDeleted: true });
    return category;
  }
}

export default CategoryService;
