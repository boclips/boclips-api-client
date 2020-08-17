import { UsersClient } from './UsersClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { ApiSubClient } from '../../common/client/ApiSubClient';

export class ApiUsersClient extends ApiSubClient implements UsersClient {
  isUserActive(id: string): Promise<boolean> {
    const isUserActiveLink = this.getLinkOrThrow('isUserActive');
    return this.axios
      .get(expandUrlTemplate(isUserActiveLink.href, { id }))
      .then(response => response.status === 200)
      .catch(_ => false);
  }
}
