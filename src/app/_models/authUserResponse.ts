import { User } from './user';

export interface AuthUserResponse {
  user: User;
  token: string;
}
