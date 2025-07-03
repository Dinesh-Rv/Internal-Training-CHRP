import { User, IUser, UserRole } from '../models/User';
import { IUserService } from './IUserService';
import { ValidationError } from 'sequelize';

export class UserService implements IUserService {
  async createUser(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<IUser> {
    // Business logic: username must be unique, role must be valid
    if (!Object.values(UserRole).includes(user.userrole)) {
      throw new Error('Invalid user role');
    }
    try {
      const created = await User.create(user);
      return created.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Username already exists');
      }
      throw err;
    }
  }

  async getUserById(id: number): Promise<IUser | null> {
    return User.findByPk(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return User.findAll();
  }

  async updateUser(id: number, updates: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    try {
      await user.update(updates);
      return user.toJSON();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
      }
      throw err;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
} 