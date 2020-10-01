import { User } from '../../organisations/model/User';
import { UsersClient } from './UsersClient';

export class FakeUsersClient implements UsersClient {
  private activeUserIds: string[] = [];
  private currentUser: User | null = null;

  public isUserActive(id: string): Promise<boolean> {
    return Promise.resolve(this.activeUserIds.includes(id));
  }

  public insertActiveUserId(id: string) {
    this.activeUserIds.push(id);
  }

  public insertCurrentUser(user: User) {
    this.currentUser = user;
  }

  public clear() {
    this.activeUserIds = [];
    this.currentUser = null;
  }

  public getCurrentUser(): Promise<User> {
    if (this.currentUser === null) {
      throw new Error('Current user is not set up');
    }
    return Promise.resolve(this.currentUser);
  }
}
