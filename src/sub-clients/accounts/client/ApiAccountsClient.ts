import { ApiSubClient } from '../../common/client/ApiSubClient';
import Pageable from '../../common/model/Pageable';
import { PageableEntity } from '../../common/model/PageableEntity';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { Account } from '../model/Account';
import { AccountEntity } from '../model/AccountEntity';
import { AccountsConverter } from '../model/AccountsConverter';
import { UpdateAccountRequest } from '../model/UpdateAccountRequest';
import { AccountsClient, AccountsFilter } from './AccountsClient';

export class ApiAccountsClient extends ApiSubClient implements AccountsClient {
  public async getAccounts(
    filter?: AccountsFilter,
  ): Promise<Pageable<Account> | null> {
    const link = this.getLinkOrThrow('independentAccounts');

    const response = await this.axios.get<PageableEntity<AccountEntity>>(
      expandUrlTemplate(link.href, {
        countryCode: filter && filter.countryCode,
        page: filter && filter.page,
        size: filter && filter.size,
      }),
    );

    return AccountsConverter.convertPage(response.data);
  }

  public async updateAccount(
    account: Account,
    updateAccountRequest: UpdateAccountRequest,
  ): Promise<Account> {
    const link = account.links.edit.getOriginalLink();

    const response = await this.axios.patch<AccountEntity>(
      link,
      updateAccountRequest,
    );

    return AccountsConverter.convert(response.data);
  }
}
