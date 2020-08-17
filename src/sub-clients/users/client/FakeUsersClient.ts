import { UsersClient } from './UsersClient';

export class FakeUsersClient implements UsersClient {
  private activeUserIds: string[] = [];

  public isUserActive(id: string): Promise<boolean> {
    return Promise.resolve(this.activeUserIds.includes(id));
  }

  public insertActiveUserId(id: string) {
    this.activeUserIds.push(id);
  }

  public clear() {
    this.activeUserIds = [];
  }
}
