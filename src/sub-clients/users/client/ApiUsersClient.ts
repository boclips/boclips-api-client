import { User } from '../../organisations/model/User';
import { UserConverter } from '../../organisations/model/UserConverter';
import { UsersClient } from './UsersClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ApiSubClient } from '../../common/client/ApiSubClient';

export class ApiUsersClient extends ApiSubClient implements UsersClient {
  isUserActive(id: string): Promise<boolean> {
    const isUserActiveLink = this.getLinkOrThrow('isUserActive');
    return this.axios
      .get(expandUrlTemplate(isUserActiveLink.href, { id }))
      .then((response) => response.status === 200)
      .catch((_) => false);
  }

  getCurrentUser(): Promise<User> {
    const currentUser = this.getLinkOrThrow('currentUser');
    return this.axios
      .get(currentUser.href)
      .then((response) => UserConverter.convert(response.data));
  }
}
