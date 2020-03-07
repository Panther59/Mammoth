import { Store } from './store';
import { User } from './user';

export class AuthResponse {
  user: User;
  store: Store;
  token: string;
  type: string;
}
