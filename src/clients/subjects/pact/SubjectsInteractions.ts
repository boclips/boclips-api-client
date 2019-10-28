import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../test-support/pactSetup';

const { eachLike, like } = Matchers;

export const existingSubjectFromStaging = '5cb499c9fd5beb428189454f';

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
          id: existingSubjectFromStaging,
          name: 'Subject Sample',
          _links: like({
            self: {
              href: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectFromStaging}`,
            },
            update: {
              href: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectFromStaging}`,
            },
          }),
        }),
      },
    },
  },
});

export const updateSubject = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PUT subject',
  withRequest: {
    method: 'PUT',
    path: `/v1/subjects/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: like({
      name: 'Design',
    }),
  },
  willRespondWith: {
    status: 204,
  },
});
