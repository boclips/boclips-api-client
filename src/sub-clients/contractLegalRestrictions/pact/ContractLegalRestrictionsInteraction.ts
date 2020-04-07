import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike } = Matchers;

export const getContractLegalRestrictions: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET contract legal restrictions',
  withRequest: {
    method: 'GET',
    path: '/v1/contract-legal-restrictions',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        restrictions: eachLike({ id: '2', text: 'No restrictions' }),
      },
    },
  },
};
