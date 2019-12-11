import { Link } from '../../common/model/LinkEntity';
import Pageable from '../../common/model/Pageable';
import { PageableConverter } from '../../common/model/PageableConverter';
import { PageableEntity } from '../../common/model/PageableEntity';
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
      organisation: OrganisationAccountConverter.convertOrganisation(
        entity.organisation,
      ),
      links: OrganisationAccountConverter.convertLinks(entity._links),
    };
  }

  public static convertPage(
    entity: PageableEntity<OrganisationAccountEntity>,
  ): Pageable<OrganisationAccount> {
    return PageableConverter.convert(
      entity,
      'organisationAccount',
      OrganisationAccountConverter.convert,
    );
  }

  private static convertOrganisation(entity: OrganisationEntity): Organisation {
    if (entity.type !== 'SCHOOL' && entity.type !== 'DISTRICT') {
      throw new Error(`Unsupported type of organisation ${entity.type}`);
    }

    return {
      type: entity.type,
      name: entity.name,
      country: OrganisationAccountConverter.convertCountry(entity.country),
      state: OrganisationAccountConverter.convertState(entity.state),
    };
  }

  private static convertLinks(
    linkEntities: OrganisationAccountEntity['_links'],
  ): OrganisationAccount['links'] {
    const links: OrganisationAccount['links'] = {
      self: new Link(linkEntities.self),
    };

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
