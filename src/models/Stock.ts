import { DataTypes, Model, Optional } from 'sequelize';
import database from '../config/database';
import { Product } from './Product';

export interface IStock {
  id?: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface StockCreationAttributes extends Optional<IStock, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class Stock extends Model<IStock, StockCreationAttributes> implements IStock {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
  },
  {
    sequelize: database.getSequelize(),
    modelName: 'Stock',
    tableName: 'stocks',
    timestamps: true,
    paranoid: true,
  },
);

Stock.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); 