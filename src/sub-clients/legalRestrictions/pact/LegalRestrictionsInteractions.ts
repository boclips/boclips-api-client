import { InteractionObject, Matchers } from '@pact-foundation/pact';

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
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        legalRestrictions: eachLike({ id: '2', text: 'No restrictions' }),
      },
    },
  },
};
