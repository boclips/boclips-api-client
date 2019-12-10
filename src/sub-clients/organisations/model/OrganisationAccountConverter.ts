import { Link } from '../../common/model/LinkEntity';
import {
  Country,
  Organisation,
  OrganisationAccount,
  State,
} from './OrganisationAccount';
import {
  CountryEntity,
  OrganisationAccountEntity,
  OrganisationEntity,
  StateEntity,
} from './OrganisationAccountEntity';

export class OrganisationAccountConverter {
  public static convert(
    entity: OrganisationAccountEntity,
  ): OrganisationAccount {
    return {
      id: entity.id,
      contractIds: entity.contractIds,
      accessExpiresOn: entity.accessExpiresOn
        ? new Date(entity.accessExpiresOn)
        : null,
      organisation: this.convertOrganisation(entity.organisation),
      links: this.convertLinks(entity._links),
    };
  }

  private static convertOrganisation(entity: OrganisationEntity): Organisation {
    if (entity.type !== 'SCHOOL' && entity.type !== 'DISTRICT') {
      throw new Error(`Unsupported type of organisation ${entity.type}`);
    }

    return {
      type: entity.type,
      name: entity.name,
      country: this.convertCountry(entity.country),
      state: this.convertState(entity.state),
    };
  }

  private static convertLinks(
    _links: OrganisationAccountEntity['_links'],
  ): OrganisationAccount['links'] {
    const links: OrganisationAccount['links'] = {
      self: new Link(_links.self),
    };

    if (_links.edit) {
      links.edit = new Link(_links.edit);
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
