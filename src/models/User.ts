import { DataTypes, Model, Optional } from 'sequelize';
import database from '../config/database';

export enum UserRole {
  SUPERUSER = 'SUPERUSER',
  STORE_MANAGER = 'STORE_MANAGER',
  SALES_AGENT = 'SALES_AGENT',
}

export interface IUser {
  id?: number;
  username: string;
  userrole: UserRole;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface UserCreationAttributes extends Optional<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public username!: string;
  public userrole!: UserRole;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
    userrole: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
  },
  {
    sequelize: database.getSequelize(),
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true, // enables soft deletes
  },
); 