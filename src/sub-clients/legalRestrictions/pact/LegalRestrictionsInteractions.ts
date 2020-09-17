import { InteractionObject, Matchers } from '@pact-foundation/pact';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

const { eachLike } = Matchers;

export const getLegalRestrictions: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET legal restrictions',
  withRequest: {
    method: 'GET',
    path: '/v1/legal-restrictions',
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
        legalRestrictions: eachLike({ id: '2', text: 'No restrictions' }),
      },
    },
  },
};
