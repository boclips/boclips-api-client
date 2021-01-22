import { UserFactory } from '../../../test-support/UserFactory';
import { User } from '../../organisations/model/User';
import { UsersClient } from './UsersClient';

export class FakeUsersClient implements UsersClient {
  private activeUserIds: string[] = [];
  private currentUser: User = UserFactory.sample();

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
    this.currentUser = UserFactory.sample();
  }

  public getCurrentUser(): Promise<User> {
    return Promise.resolve(this.currentUser);
  }
}
