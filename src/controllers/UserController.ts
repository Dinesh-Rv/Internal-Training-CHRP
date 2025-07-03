import { Request, Response } from 'express';
import { IUserService } from '../services/IUserService';
import { UserRole } from '../models/User';

export class UserController {
  constructor(private userService: IUserService) {}

  async createUser(req: Request, res: Response) {
    const { username, userrole, password } = req.body;
    if (!username || !userrole || !password) {
      return res.status(400).json({ message: 'username, userrole, and password are required.' });
    }
    if (!Object.values(UserRole).includes(userrole)) {
      return res.status(400).json({ message: 'Invalid user role.' });
    }
    try {
      const user = await this.userService.createUser({ username, userrole, password });
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid user id.' });
    const user = await this.userService.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  }

  async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid user id.' });
    try {
      const user = await this.userService.updateUser(id, req.body);
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid user id.' });
    const deleted = await this.userService.deleteUser(id);
    if (!deleted) return res.status(404).json({ message: 'User not found.' });
    return res.status(204).send();
  }
} 