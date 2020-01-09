import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Account } from '../model/Account';
import { AccountsConverter } from '../model/AccountsConverter';
import { AccountsClient, AccountsFilter } from './AccountsClient';

export class ApiAccountsClient extends ApiSubClient implements AccountsClient {
  public async getIndependentAccounts(
    filter?: AccountsFilter,
  ): Promise<Pageable<Account> | null> {
    const link = this.getLinkOrThrow('independentAccounts');

    const response = await this.axios.get(
      expandUrlTemplate(link.href, {
        countryCode: filter && filter.countryCode,
        page: filter && filter.page,
        size: filter && filter.size,
      }),
    );

    return AccountsConverter.convertPage(response.data);
  }
}
