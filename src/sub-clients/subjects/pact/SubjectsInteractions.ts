import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../pact-support/pactSetup';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

const { eachLike, like } = Matchers;

export const existingSubjectIdFromStaging = '5cb499c9fd5beb428189454f';

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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
    },
    body: {
      _embedded: {
        subjects: eachLike({
          id: existingSubjectIdFromStaging,
          name: 'Subject Sample',
          _links: like({
            self: {
              href: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectIdFromStaging}`,
            },
            update: {
              href: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectIdFromStaging}`,
            },
          }),
        }),
      },
    },
  },
});

export const updateSubject = (
  id: string,
  newName: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'PUT subject',
  withRequest: {
    method: 'PUT',
    path: `/v1/subjects/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: like({
      name: newName,
    }),
  },
  willRespondWith: {
    status: 204,
  },
});
