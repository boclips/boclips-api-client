import { InteractionObject, Matchers } from '@pact-foundation/pact';

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
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        tags: eachLike({ id: '1', label: 'label', userId: null }),
      },
    },
  },
};
