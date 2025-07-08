import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Product from './Product';

interface StockAttributes {
  id: number;
  productId: number;
  quantity: number;
}

class Stock extends Model<StockAttributes, Optional<StockAttributes, 'id'>> implements StockAttributes {
  public id!: number;
  public productId!: number;
  public quantity!: number;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Stock',
    tableName: 'stocks',
    timestamps: true,
  }
);

Stock.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasOne(Stock, { foreignKey: 'productId', as: 'stock' });

export default Stock; 