import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Category from './Category';

interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  isActive: boolean;
  isDeleted: boolean;
}

class Product extends Model<ProductAttributes, Optional<ProductAttributes, 'id' | 'description' | 'isActive' | 'isDeleted'>> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public categoryId!: number;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

Product.init(
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'categories', key: 'id' },
      onDelete: 'CASCADE',
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
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

export default Product; 