import { InteractionObject } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';
import { Link } from '../../../types';

export const existingOrganisationIdFromStaging = '5ddeb540140a630001bbbc7d';

export const getIndependentOrganisationsInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET organisations',
  withRequest: {
    method: 'GET',
    path: '/v1/independent-organisations',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        organisationAccounts: eachLike(
          createOrganisation(existingOrganisationIdFromStaging),
        ),
      },
    },
  },
});

const createOrganisation = (id: string) => ({
  id,
  accessExpiresOn: '2019-12-04T15:11:59.531Z',
  organisation: {
    name: 'My organisation',
    type: 'DISTRICT',
  },
  _links: {
    self: {
      href: `/v1/organisations/${id}`
    },
    update: {
      href: `/v1/organisations/${id}`
  }
});
