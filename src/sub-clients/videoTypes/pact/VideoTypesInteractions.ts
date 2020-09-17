import { InteractionObject, Matchers } from '@pact-foundation/pact';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

const { eachLike } = Matchers;

export const getVideoTypes: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET video types',
  withRequest: {
    method: 'GET',
    path: '/v1/video-types',
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
        videoTypes: eachLike('type'),
      },
    },
  },
};
