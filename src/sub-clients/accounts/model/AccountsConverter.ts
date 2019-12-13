import { Link } from '../../common/model/LinkEntity';
import Pageable from '../../common/model/Pageable';
import { PageableConverter } from '../../common/model/PageableConverter';
import { PageableEntity } from '../../common/model/PageableEntity';
import { Account, Country, Organisation, State } from './Account';
import {
  AccountEntity,
  CountryEntity,
  OrganisationEntity,
  StateEntity,
} from './AccountEntity';

export class AccountsConverter {
  public static convert(entity: AccountEntity): Account {
    return {
      id: entity.id,
      contractIds: entity.contractIds,
      accessExpiresOn: entity.accessExpiresOn
        ? new Date(entity.accessExpiresOn)
        : null,
      organisation: AccountsConverter.convertOrganisation(entity.organisation),
      links: AccountsConverter.convertLinks(entity._links),
    };
  }

  public static convertPage(
    entity: PageableEntity<AccountEntity>,
  ): Pageable<Account> {
    return PageableConverter.convert(
      entity,
      'account',
      AccountsConverter.convert,
    );
  }

  private static convertOrganisation(entity: OrganisationEntity): Organisation {
    if (entity.type !== 'SCHOOL' && entity.type !== 'DISTRICT') {
      throw new Error(`Unsupported type of organisation ${entity.type}`);
    }

    return {
      type: entity.type,
      name: entity.name,
      country: AccountsConverter.convertCountry(entity.country),
      state: AccountsConverter.convertState(entity.state),
    };
  }

  private static convertLinks(
    linkEntities: AccountEntity['_links'],
  ): Account['links'] {
    const links: Account['links'] = {};

    if (linkEntities.edit) {
      links.edit = new Link(linkEntities.edit);
    }

    return links;
  }

  private static convertState(entity: StateEntity): State {
    if (entity == null) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
    };
  }

  private static convertCountry(entity: CountryEntity): Country {
    if (entity == null) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
