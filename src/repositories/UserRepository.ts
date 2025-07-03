import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';
import { IUserRepository } from './IUserRepository';

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(User);
  }
  // Add user-specific repository methods here if needed
} 