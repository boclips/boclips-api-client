import { InteractionObject } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';

export const getMarketingStatusesInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET marketing statuses',
  withRequest: {
    method: 'GET',
    path: '/v1/marketing-statuses',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        statuses: eachLike('a status'),
      },
    },
  },
});
