import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

export const getSuggestions = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET suggestions',
  withRequest: {
    method: 'GET',
    path: '/v1/suggestions',
    query: 'query=his',
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
      suggestionTerm: 'his',
      channels: eachLike({
        id: 'channel-id',
        name: 'The History Channel',
      }),
      subjects: eachLike({
        id: 'subject id',
        name: 'Art History',
      }),
    },
  },
});
