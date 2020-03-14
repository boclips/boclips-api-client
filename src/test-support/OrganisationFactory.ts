import {
  Organisation,
  OrganisationDetails,
} from '../sub-clients/organisations/model/Organisation';
import { OrganisationEntity } from '../sub-clients/organisations/model/OrganisationEntity';

export class OrganisationEntityFactory {
  public static sample(
    args: Partial<OrganisationEntity> = {},
  ): OrganisationEntity {
    return {
      id: '5db06aec7c6c020001339eb2',
      contentPackageId: 'a-content-package-id',
      accessExpiresOn: null,
      organisationDetails: {
        name: 'Towle Institute',
        domain: null,
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
          href:
            'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2',
        },
        associateUsers: {
          href:
            'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2/associate',
        },
      },
      ...args,
    };
  }
}

export class OrganisationFactory {
  public static sample(args: Partial<Organisation> = {}): Organisation {
    return {
      organisationDetails: OrganisationDetailsFactory.sample(),
      accessExpiresOn: new Date(Date.parse('2019-12-10')),
      contentPackageId: 'a-content-package-id',
      id: 'org-account-id',
      links: {},
      ...args,
    };
  }
}

export class OrganisationDetailsFactory {
  public static sample(
    args: Partial<OrganisationDetails> = {},
  ): OrganisationDetails {
    return {
      country: {
        id: 'USA',
        name: 'United States',
      },
      name: 'My organisation',
      domain: null,
      state: {
        name: 'California',
        id: 'CA',
      },
      type: 'SCHOOL',
      ...args,
    };
  }
}
