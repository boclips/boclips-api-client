import { Account, Organisation } from '../sub-clients/accounts/model/Account';
import { AccountEntity } from '../sub-clients/accounts/model/AccountEntity';

export class AccountEntityFactory {
  public static sample(args: Partial<AccountEntity> = {}): AccountEntity {
    return {
      id: '5db06aec7c6c020001339eb2',
      contractIds: ['contract-123'],
      accessExpiresOn: null,
      organisation: {
        name: 'Towle Institute',
        type: 'SCHOOL',
        state: {
          id: 'DE',
          name: 'Delaware',
        },
        country: {
          id: 'USA',
          name: 'United States',
          states: null,
        },
      },
      _links: {
        edit: {
          href: 'https://api.boclips.com/v1/accounts/5db06aec7c6c020001339eb2',
        },
      },
      ...args,
    };
  }
}

export class AccountFactory {
  public static sample(args: Partial<Account> = {}): Account {
    return {
      organisation: OrganisationFactory.sample(),
      accessExpiresOn: new Date(Date.parse('2019-12-10')),
      contractIds: [],
      id: 'org-account-id',
      links: {},
      ...args,
    };
  }
}

export class OrganisationFactory {
  public static sample(args: Partial<Organisation> = {}): Organisation {
    return {
      country: {
        id: 'USA',
        name: 'United States',
      },
      name: 'My organisation',
      state: {
        name: 'California',
        id: 'CA',
      },
      type: 'SCHOOL',
      ...args,
    };
  }
}
