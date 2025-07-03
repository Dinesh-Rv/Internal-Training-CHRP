import { IUser } from '../models/User';
import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<IUser> {
  // Add user-specific repository methods here if needed
} 