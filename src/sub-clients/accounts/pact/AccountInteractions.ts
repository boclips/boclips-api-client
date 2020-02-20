import { InteractionObject } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';
import { UpdateAccountRequest } from '../model/UpdateAccountRequest';

export const getAccountsByCountryCode = (
  id: string,
  countryCode: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET Accounts by country code',
  withRequest: {
    method: 'GET',
    path: `/v1/accounts`,
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
        account: eachLike({
          id: like(id),
          /**
           * The accessExpiresOn field should be described here, but since it's optional in
           * the schema we cannot describe here.
           *
           * @see https://github.com/DiUS/pact-jvm/issues/319
           */
          accessRuleIds: like([]),
          organisation: like({
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
              href: `${provider.mockService.baseUrl}/v1/accounts/${id}`,
            },
          }),
        }),
      },
    },
  },
});

export const updateAccount = (
  id: string,
  updateAccountRequest: UpdateAccountRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PATCH Account to change accessExpiresOn',
  withRequest: {
    method: 'PATCH',
    path: `/v1/accounts/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: updateAccountRequest,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      id: like(id),
      accessExpiresOn: like(updateAccountRequest.accessExpiresOn.toISOString()),
      accessRuleIds: like([]),
      organisation: like({
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
          href: `${provider.mockService.baseUrl}/v1/accounts/${id}`,
        }),
      },
    },
  },
});
