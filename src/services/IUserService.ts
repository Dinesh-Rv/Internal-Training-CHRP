import { IUser } from '../models/User';

export interface IUserService {
  createUser(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<IUser>;
  getUserById(id: number): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
  updateUser(id: number, updates: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: number): Promise<boolean>;
} 