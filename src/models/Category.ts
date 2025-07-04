import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface CategoryAttributes {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isDeleted: boolean;
}

class Category extends Model<CategoryAttributes, Optional<CategoryAttributes, 'id' | 'description' | 'isActive' | 'isDeleted'>> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
  }
);

export default Category;
