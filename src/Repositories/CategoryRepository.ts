import Category from '../models/Category';

export class CategoryRepository {
  static async create(data: {
    name: string;
    description?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }) {
    return Category.create(data);
  }

  static async findAll() {
    return Category.findAll({ where: { isDeleted: false } });
  }

  static async findById(id: number) {
    return Category.findOne({ where: { id, isDeleted: false } });
  }

  static async findByPk(id: number) {
    return Category.findByPk(id);
  }

  static async update(categoryInstance: Category, data: Partial<{ name: string; description?: string; isActive?: boolean; isDeleted?: boolean; }>) {
    return categoryInstance.update(data);
  }
}

export default CategoryRepository; 