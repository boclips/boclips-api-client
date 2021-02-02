import Pageable from '../../common/model/Pageable';
import { Organisation } from './Organisation';
import { OrganisationEntityFactory } from '../../../test-support/OrganisationFactory';
import { OrganisationsConverter } from './OrganisationsConverter';

describe('OrganisationConverter', () => {
  it('converts a school to an Organisation', () => {
    const schoolEntity = OrganisationEntityFactory.sample({
      id: '5db06aec7c6c020001339eb2',
      deal: {
        billing: false,
        contentPackageId: 'a-content-package-id',
        accessExpiresOn: null,
      },
      organisationDetails: {
        name: 'Towle Institute',
        domain: 'domain.com',
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

    const convertedOrganisation: Organisation = OrganisationsConverter.convert(
      schoolEntity,
    );

    expect(convertedOrganisation.id).toEqual('5db06aec7c6c020001339eb2');
    expect(convertedOrganisation.deal.contentPackageId).toEqual(
      'a-content-package-id',
    );
    expect(convertedOrganisation.deal.accessExpiresOn).toBeNull();
    expect(convertedOrganisation.organisationDetails.name).toEqual(
      'Towle Institute',
    );
    expect(convertedOrganisation.organisationDetails.type).toEqual('SCHOOL');
    expect(convertedOrganisation.organisationDetails.state).toEqual({
      id: 'DE',
      name: 'Delaware',
    });
    expect(convertedOrganisation.organisationDetails.country).toEqual({
      id: 'USA',
      name: 'United States',
    });
    expect(convertedOrganisation.links).not.toBeNull();
    expect(convertedOrganisation.links.edit?.getOriginalLink()).toEqual(
      'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2',
    );
    expect(
      convertedOrganisation.links.associateUsers?.getOriginalLink(),
    ).toEqual(
      'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2/associate',
    );
  });

  it('converts an organisation with an accessExpiresOn', () => {
    const iso = '2019-12-11T08:30:20.201Z';
    const date = new Date(iso);

    const organisationEntity = OrganisationEntityFactory.sample({
      deal: {
        accessExpiresOn: iso,
        billing: false,
      },
    });

    const convertedOrganisation: Organisation = OrganisationsConverter.convert(
      organisationEntity,
    );

    expect(convertedOrganisation.deal.accessExpiresOn).toEqual(date);
  });

  it('converts an organisation without a state', () => {
    const organisationEntity = OrganisationEntityFactory.sample({
      organisationDetails: {
        name: 'Towle Institute',
        domain: '',
        type: 'SCHOOL',
        state: null,
        country: {
          id: 'USA',
          name: 'United States',
          states: null,
        },
      },
    });

    const convertedOrganisation: Organisation = OrganisationsConverter.convert(
      organisationEntity,
    );

    expect(convertedOrganisation.organisationDetails.state).toBeNull();
  });

  it('converts a district', () => {
    const districtEntity = OrganisationEntityFactory.sample({
      organisationDetails: {
        name: 'parentOrg',
        domain: '',
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

    const convertedOrganisation: Organisation = OrganisationsConverter.convert(
      districtEntity,
    );

    expect(convertedOrganisation.organisationDetails.type).toEqual('DISTRICT');
  });

  it('converts an api integration', () => {
    const apiEntity = OrganisationEntityFactory.sample({
      organisationDetails: {
        name: 'parentOrg',
        domain: '',
        country: {
          id: 'USA',
          name: 'United states',
          states: null,
        },
        type: 'API',
        state: {
          id: 'KY',
          name: 'Kentucky',
        },
      },
    });

    const convertedOrganisation: Organisation = OrganisationsConverter.convert(
      apiEntity,
    );

    expect(convertedOrganisation.organisationDetails.type).toEqual('API');
  });

  it('converts lti deployment to an Organisation', () => {
    const ltiDeploymentEntity = OrganisationEntityFactory.sample({
      id: '5db06aec7c6c020001339eb2',
      deal: {
        contentPackageId: '',
        billing: false,
      },
      organisationDetails: {
        name: 'lti-deployment',
        domain: '',
        country: {
          id: 'USA',
          name: 'United states',
          states: null,
        },
        type: 'LTI_DEPLOYMENT',
        state: null,
      },
    });

    const convertedOrganisation: Organisation = OrganisationsConverter.convert(
      ltiDeploymentEntity,
    );

    expect(convertedOrganisation.organisationDetails.type).toEqual(
      'LTI_DEPLOYMENT',
    );
  });

  it('can convert a page of Organisations, and page metadata', () => {
    const pageResponse = {
      _embedded: {
        organisations: [
          OrganisationEntityFactory.sample({ id: 'my-organisation-id' }),
        ],
      },
      page: {
        size: 30,
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
      _links: {},
    };

    const convertedPage: Pageable<Organisation> = OrganisationsConverter.convertPage(
      pageResponse,
    );

    expect(convertedPage.pageSpec.size).toEqual(30);
    expect(convertedPage.pageSpec.totalElements).toEqual(1);
    expect(convertedPage.pageSpec.totalPages).toEqual(1);
    expect(convertedPage.pageSpec.number).toEqual(0);

    expect(convertedPage.page).toHaveLength(1);
    expect(convertedPage.page[0].id).toEqual('my-organisation-id');
  });
});
