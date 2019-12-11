import { Link } from '../../common/model/LinkEntity';
import { Organisation, OrganisationAccount } from './OrganisationAccount';
import { OrganisationAccountEntity } from './OrganisationAccountEntity';

export class OrganisationAccountEntityFactory {
  public static sample(
    args: Partial<OrganisationAccountEntity> = {},
  ): OrganisationAccountEntity {
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
        self: {
          href:
            'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2',
        },
        edit: {
          href:
            'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2',
        },
      },
      ...args,
    };
  }
}

export class OrganisationAccountFactory {
  public static sample(
    args: Partial<OrganisationAccount> = {},
  ): OrganisationAccount {
    return {
      organisation: OrganisationFactory.sample(),
      accessExpiresOn: new Date(Date.parse('2019-12-10')),
      contractIds: [],
      id: 'org-account-id',
      links: {
        self: new Link({
          href: '',
        }),
      },
      ...args,
    };
  }
}

class OrganisationFactory {
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
