import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike } = Matchers;

export const getContentWarnings: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET content warnings',
  withRequest: {
    method: 'GET',
    path: '/v1/content-warnings',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        contentWarnings: eachLike({
          id: '2',
          label: 'Disclaimer: this is a warning',
        }),
      },
    },
  },
};
