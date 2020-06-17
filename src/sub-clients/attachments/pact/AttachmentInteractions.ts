import { InteractionObject, Matchers } from '@pact-foundation/pact';

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
      'Content-Type': 'application/hal+json;charset=UTF-8',
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
