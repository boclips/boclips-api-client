import { InteractionObject, Matchers } from '@pact-foundation/pact';
import {
  ISO8601_DATETIME_WITH_MILLIS_FORMAT,
  term,
} from '@pact-foundation/pact/dsl/matchers';
import { provider } from '../../../pact-support/pactSetup';
const { like } = Matchers;

export const existingCollectionFromStaging = '5cfa8941943b723f4563b3bb';

export const getCollectionById = (
  id: string = existingCollectionFromStaging,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET collection',
  withRequest: {
    method: 'GET',
    path: `/v1/collections/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      id: like(id),
      owner: like('owner-id'),
      title: like('My Videos edited'),
      updatedAt: term({
        generate: '2019-10-21T09:11:19.074Z',
        matcher: ISO8601_DATETIME_WITH_MILLIS_FORMAT,
      }),
      public: like(false),

      mine: like(false),
      createdBy: like('Teacher'),
      _links: like({
        self: {
          href: `${provider.mockService.baseUrl}/v1/collections/${id}`,
        },
      }),
    },
  },
});
