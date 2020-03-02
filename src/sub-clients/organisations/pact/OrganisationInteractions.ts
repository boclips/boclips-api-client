import { InteractionObject } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';
import { UpdateOrganisationRequest } from '../model/UpdateOrganisationRequest';

export const getOrganisationsByCountryCode = (
  id: string,
  countryCode: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET Organisations by country code',
  withRequest: {
    method: 'GET',
    path: `/v1/organisations`,
    query: {
      countryCode: `${countryCode}`,
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
        organisations: eachLike({
          id: like(id),
          /**
           * The accessExpiresOn field should be described here, but since it's optional in
           * the schema we cannot describe here.
           *
           * @see https://github.com/DiUS/pact-jvm/issues/319
           */
          accessRuleIds: like([]),
          organisationDetails: like({
            name: like('1st Football High School'),
            type: like('SCHOOL'),
            country: like({
              id: `${countryCode}`,
              name: 'United States',
              states: null,
            }),
          }),
          _links: like({
            edit: {
              href: `${provider.mockService.baseUrl}/v1/organisations/${id}`,
            },
          }),
        }),
      },
    },
  },
});

export const updateOrganisation = (
  id: string,
  updateOrganisationRequest: UpdateOrganisationRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH Organisation to change accessExpiresOn',
  withRequest: {
    method: 'PATCH',
    path: `/v1/organisations/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: updateOrganisationRequest,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      id: like(id),
      accessExpiresOn: like(
        updateOrganisationRequest.accessExpiresOn.toISOString(),
      ),
      accessRuleIds: like([]),
      organisationDetails: like({
        name: like('1st Football High School'),
        type: like('SCHOOL'),
        country: like({
          id: `USA`,
          name: 'United States',
          states: null,
        }),
      }),
      _links: {
        edit: like({
          href: `${provider.mockService.baseUrl}/v1/organisations/${id}`,
        }),
      },
    },
  },
});
