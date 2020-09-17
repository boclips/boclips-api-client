import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

export const getEduAgeRangesInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET age ranges',
  withRequest: {
    method: 'GET',
    path: '/v1/age-ranges',
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
        ageRanges: eachLike({
          id: 'early-years',
          label: '3 - 5 Early Years',
          min: 3,
        }),
      },
    },
  },
});
