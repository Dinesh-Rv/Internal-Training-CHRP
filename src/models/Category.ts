import { DataTypes, Model, Optional } from 'sequelize';
import database from '../config/database';

export interface ICategory {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface CategoryCreationAttributes extends Optional<ICategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class Category extends Model<ICategory, CategoryCreationAttributes> implements ICategory {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
  },
  {
    sequelize: database.getSequelize(),
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    paranoid: true,
  },
); 