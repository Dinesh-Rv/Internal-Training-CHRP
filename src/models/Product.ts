import { DataTypes, Model, Optional } from 'sequelize';
import database from '../config/database';
import { Category } from './Category';

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface ProductCreationAttributes extends Optional<IProduct, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
  public id!: number;
  public name!: string;
  public price!: number;
  public categoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize: database.getSequelize(),
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true,
  },
);

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' }); 