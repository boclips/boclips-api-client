import { InteractionObject, Matchers } from '@pact-foundation/pact';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

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
      'Content-Type': Matchers.term({
        generate: 'application/hal+json;charset=UTF-8',
        matcher: contentTypeRegex,
      }),
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
