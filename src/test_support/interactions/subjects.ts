import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../pactSetup';

const { eachLike, like } = Matchers;

export const getSubjects = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET subjects',
  withRequest: {
    method: 'GET',
    path: '/v1/subjects',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      _embedded: {
        subjects: eachLike({
          id: '2',
          name: 'Subject Sample',
          _links: like({
            self: {
              href: `${provider.mockService.baseUrl}/v1/subjects/2`,
            },
            update: {
              href: `${provider.mockService.baseUrl}/v1/subjects/2`,
            },
          }),
        }),
      },
    },
  },
});
