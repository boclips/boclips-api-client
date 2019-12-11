import { InteractionObject } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';

export const getOrganisationAccountsByCountryCode = (
  id: string,
  countryCode: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET organisationAccounts by country code',
  withRequest: {
    method: 'GET',
    path: `/v1/independent-organisations`,
    query: {
      countryCode: 'USA',
      page: '0',
      size: '30',
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      page: {
        number: like(0),
        size: like(30),
        totalElements: like(1),
        totalPages: like(1),
      },
      _embedded: {
        organisationAccount: eachLike({
          id: like(id),
          /**
           * The accessExpiresOn field should be described here, but since it's optional in
           * the schema we cannot describe here.
           *
           * @see https://github.com/DiUS/pact-jvm/issues/319
           */
          contractIds: like([]),
          organisation: like({
            name: like('1st Football High School'),
            type: like('SCHOOL'),
            country: like({
              id: 'USA',
              name: 'United States',
              states: null,
            }),
          }),
          _links: like({
            self: {
              href:
                'https://api.boclips.com/v1/organisations/5daa05af7e5bb50001ead980',
            },
            edit: {
              href:
                'https://api.boclips.com/v1/organisations/5daa05af7e5bb50001ead980',
            },
          }),
        }),
      },
      _links: like({
        next: {
          href: `${provider.mockService.baseUrl}/v1/independent-organisations?countryCode=${countryCode}`,
        },
      }),
    },
  },
});
