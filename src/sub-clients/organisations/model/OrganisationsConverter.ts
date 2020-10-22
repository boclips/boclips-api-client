import { Link } from '../../common/model/LinkEntity';
import Pageable from '../../common/model/Pageable';
import { PageableConverter } from '../../common/model/PageableConverter';
import { PageableEntity } from '../../common/model/PageableEntity';
import {
  Country,
  Organisation,
  OrganisationDetails,
  State,
} from './Organisation';
import {
  CountryEntity,
  OrganisationDetailsEntity,
  OrganisationEntity,
  StateEntity,
} from './OrganisationEntity';

export class OrganisationsConverter {
  public static convert(entity: OrganisationEntity): Organisation {
    return {
      id: entity.id,
      contentPackageId: entity.contentPackageId,
      accessExpiresOn: entity.accessExpiresOn
        ? new Date(entity.accessExpiresOn)
        : null,
      organisationDetails: OrganisationsConverter.convertDetails(
        entity.organisationDetails,
      ),
      links: OrganisationsConverter.convertLinks(entity._links),
    };
  }

  public static convertPage(
    entity: PageableEntity<OrganisationEntity>,
  ): Pageable<Organisation> {
    return PageableConverter.convert(
      entity,
      'organisations',
      OrganisationsConverter.convert,
    );
  }

  private static convertDetails(
    entity: OrganisationDetailsEntity,
  ): OrganisationDetails {
    if (
      entity.type !== 'SCHOOL' &&
      entity.type !== 'DISTRICT' &&
      entity.type !== 'API' &&
      entity.type !== 'LTI_DEPLOYMENT'
    ) {
      throw new Error(`Unsupported type of organisation ${entity.type}`);
    }

    return {
      type: entity.type,
      name: entity.name,
      domain: entity.domain,
      country: OrganisationsConverter.convertCountry(entity.country)!,
      state: entity.state
        ? OrganisationsConverter.convertState(entity.state!)
        : null,
    };
  }

  private static convertLinks(
    linkEntities: OrganisationEntity['_links'],
  ): Organisation['links'] {
    const links: Organisation['links'] = {};

    if (linkEntities.edit) {
      links.edit = new Link(linkEntities.edit);
    }

    if (linkEntities.associateUsers) {
      links.associateUsers = new Link(linkEntities.associateUsers);
    }

    return links;
  }

  private static convertState(entity: StateEntity | null): State | null {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
    };
  }

  private static convertCountry(entity: CountryEntity | null): Country | null {
    if (entity === null) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
