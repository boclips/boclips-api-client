import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike } = Matchers;

export const getContentPackages: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET content packages',
  withRequest: {
    method: 'GET',
    path: '/v1/content-packages',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        contentPackages: eachLike({
          id: '2',
          name: 'My content package',
        }),
      },
    },
  },
};
