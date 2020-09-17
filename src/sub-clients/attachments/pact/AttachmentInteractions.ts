import { InteractionObject, Matchers } from '@pact-foundation/pact';
import contentTypeRegex from '../../../test-support/HalJsonContentTypeRegex';

const { eachLike } = Matchers;

export const getAttachmentTypes: InteractionObject = {
  state: undefined,
  uponReceiving: 'GET attachment types',
  withRequest: {
    method: 'GET',
    path: '/v1/attachment-types',
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
        attachmentTypes: eachLike({
          name: 'TYPE',
          label: 'My attachment type',
        }),
      },
    },
  },
};
