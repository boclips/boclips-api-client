import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/src/dsl/matchers';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      _embedded: {
        statuses: eachLike('a status'),
      },
    },
  },
});
