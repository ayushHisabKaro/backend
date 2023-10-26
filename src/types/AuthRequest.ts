import { Request } from 'express';
import { User } from '../user/entities/user.entity';

export type AuthRequest = Request & { user?: User };
