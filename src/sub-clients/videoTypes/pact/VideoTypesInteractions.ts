import { InteractionObject, Matchers } from '@pact-foundation/pact';

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
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        videoTypes: eachLike('type'),
      },
    },
  },
};
