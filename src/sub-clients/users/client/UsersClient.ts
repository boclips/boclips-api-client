import { User } from '../../organisations/model/User';

export interface UsersClient {
  isUserActive(id: string): Promise<boolean>;
  getCurrentUser(): Promise<User>;
}
