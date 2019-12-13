import Pageable from '../../common/model/Pageable';
import { Account } from './Account';
import { AccountEntityFactory } from './AccountFactory';
import { AccountsConverter } from './AccountsConverter';

describe('AccountConverter', () => {
  it('converts an independent school to an Account', () => {
    const independentSchoolEntity = AccountEntityFactory.sample({
      id: '5db06aec7c6c020001339eb2',
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
    });

    const convertedAccount: Account = AccountsConverter.convert(
      independentSchoolEntity,
    );

    expect(convertedAccount.id).toEqual('5db06aec7c6c020001339eb2');
    expect(convertedAccount.contractIds).toContainEqual('contract-123');
    expect(convertedAccount.accessExpiresOn).toBeNull();
    expect(convertedAccount.organisation.name).toEqual('Towle Institute');
    expect(convertedAccount.organisation.type).toEqual('SCHOOL');
    expect(convertedAccount.organisation.state).toEqual({
      id: 'DE',
      name: 'Delaware',
    });
    expect(convertedAccount.organisation.country).toEqual({
      id: 'USA',
      name: 'United States',
    });
    expect(convertedAccount.links).not.toBeNull();
    expect(convertedAccount.links.edit.getOriginalLink()).toEqual(
      'https://api.boclips.com/v1/accounts/5db06aec7c6c020001339eb2',
    );
  });

  it('converts an account with an accessExpiresOn', () => {
    const iso = '2019-12-11T08:30:20.201Z';
    const date = new Date(iso);

    const accountEntity = AccountEntityFactory.sample({
      accessExpiresOn: iso,
    });

    const convertedAccount: Account = AccountsConverter.convert(accountEntity);

    expect(convertedAccount.accessExpiresOn).toEqual(date);
  });

  it('converts an account without a state', () => {
    const accountEntity = AccountEntityFactory.sample({
      organisation: {
        name: 'Towle Institute',
        type: 'SCHOOL',
        state: null,
        country: {
          id: 'USA',
          name: 'United States',
          states: null,
        },
      },
    });

    const convertedAccount: Account = AccountsConverter.convert(accountEntity);

    expect(convertedAccount.organisation.state).toBeNull();
  });

  it('converts a district', () => {
    const districtEntity = AccountEntityFactory.sample({
      organisation: {
        name: 'parentOrg',
        country: {
          id: 'USA',
          name: 'United states',
          states: null,
        },
        type: 'DISTRICT',
        state: {
          id: 'KY',
          name: 'Kentucky',
        },
      },
    });

    const convertedAccount: Account = AccountsConverter.convert(districtEntity);

    expect(convertedAccount.organisation.type).toEqual('DISTRICT');
  });

  it('can convert a page of Accounts, and page metadata', () => {
    const pageResponse = {
      _embedded: {
        account: [AccountEntityFactory.sample({ id: 'my-account-id' })],
      },
      page: {
        size: 30,
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
      _links: {},
    };

    const convertedPage: Pageable<Account> = AccountsConverter.convertPage(
      pageResponse,
    );

    expect(convertedPage.pageSpec.size).toEqual(30);
    expect(convertedPage.pageSpec.totalElements).toEqual(1);
    expect(convertedPage.pageSpec.totalPages).toEqual(1);
    expect(convertedPage.pageSpec.number).toEqual(0);

    expect(convertedPage.page).toHaveLength(1);
    expect(convertedPage.page[0].id).toEqual('my-account-id');
  });
});
