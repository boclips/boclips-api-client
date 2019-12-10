import { OrganisationAccountEntity } from './OrganisationAccountEntity';

export class OrganisationAccountEntityFactory {
  public static sample(
    args: Partial<OrganisationAccountEntity>,
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
