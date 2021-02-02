import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';
import { UpdateOrganisationRequest } from '../model/UpdateOrganisationRequest';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
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
           * The accessExpiresOn and contentPackageId field should be described here, but since it's optional in
           * the schema we cannot describe here.
           *
           * @see https://github.com/DiUS/pact-jvm/issues/319
           */

          deal: like({
            billing: false,
          }),
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
            associateUsers: {
              href: `${provider.mockService.baseUrl}/v1/organisations/${id}/associate`,
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
    method: 'POST',
    path: `/v1/organisations/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: updateOrganisationRequest,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      id: like(id),
      deal: like({
        billing: like(false),
        accessExpiresOn: like(
          updateOrganisationRequest.accessExpiresOn?.toISOString(),
        ),
        contentPackageId: like('a-content-package-id'),
      }),
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

export const associateUsers = (organisationId: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST to assign users in organisation by email domain',
  withRequest: {
    method: 'POST',
    path: `/v1/organisations/${organisationId}/associate`,
    body: undefined,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      _embedded: {
        users: [],
      },
    },
  },
});
