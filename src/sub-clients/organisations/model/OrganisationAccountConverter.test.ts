import { OrganisationAccount } from './OrganisationAccount';
import { OrganisationAccountConverter } from './OrganisationAccountConverter';
import { OrganisationAccountEntityFactory } from './OrganisationAccountFactory';

describe('OrganisationAccountConverter', () => {
  it('converts an independent school to an OrganisationAccount', () => {
    const independentSchoolEntity = OrganisationAccountEntityFactory.sample({
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

    const convertedOrganisation: OrganisationAccount = OrganisationAccountConverter.convert(
      independentSchoolEntity,
    );

    expect(convertedOrganisation.id).toEqual('5db06aec7c6c020001339eb2');
    expect(convertedOrganisation.contractIds).toContainEqual('contract-123');
    expect(convertedOrganisation.accessExpiresOn).toBeNull();
    expect(convertedOrganisation.organisation.name).toEqual('Towle Institute');
    expect(convertedOrganisation.organisation.type).toEqual('SCHOOL');
    expect(convertedOrganisation.organisation.state).toEqual({
      id: 'DE',
      name: 'Delaware',
    });
    expect(convertedOrganisation.organisation.country).toEqual({
      id: 'USA',
      name: 'United States',
    });
    expect(convertedOrganisation.links).not.toBeNull();
    expect(convertedOrganisation.links.self.getOriginalLink()).toEqual(
      'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2',
    );
    expect(convertedOrganisation.links.edit.getOriginalLink()).toEqual(
      'https://api.boclips.com/v1/organisations/5db06aec7c6c020001339eb2',
    );
  });

  it('converts an organisation with an accessExpiresOn', () => {
    const iso = '2019-12-11T08:30:20.201Z';
    const date = new Date(iso);

    const organisationEntity = OrganisationAccountEntityFactory.sample({
      accessExpiresOn: iso,
    });

    const convertedOrganisation: OrganisationAccount = OrganisationAccountConverter.convert(
      organisationEntity,
    );

    expect(convertedOrganisation.accessExpiresOn).toEqual(date);
  });

  it('converts an organisation without a state', () => {
    const organisationEntity = OrganisationAccountEntityFactory.sample({
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

    const convertedOrganisation: OrganisationAccount = OrganisationAccountConverter.convert(
      organisationEntity,
    );

    expect(convertedOrganisation.organisation.state).toBeNull();
  });

  it('converts a district', () => {
    const districtEntity = OrganisationAccountEntityFactory.sample({
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

    const convertedOrganisation: OrganisationAccount = OrganisationAccountConverter.convert(
      districtEntity,
    );

    expect(convertedOrganisation.organisation.type).toEqual('DISTRICT');
  });
});
