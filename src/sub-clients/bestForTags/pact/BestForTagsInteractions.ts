import { InteractionObject, Matchers } from '@pact-foundation/pact';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

const { eachLike } = Matchers;

export const getBestForTags: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET best for tags',
  withRequest: {
    method: 'GET',
    path: '/v1/tags',
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
        tags: eachLike({ id: '1', label: 'label', userId: null }),
      },
    },
  },
};
