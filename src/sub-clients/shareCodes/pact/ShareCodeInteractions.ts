import { InteractionObject } from '@pact-foundation/pact';

export const invalidShareCode = (
  id: string,
  shareCode: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET share code invalid',
  withRequest: {
    method: 'GET',
    path: `/v1/users/${id}/shareCode/${shareCode}`,
  },
  willRespondWith: {
    status: 403,
  },
});

export const validShareCode = (
  id: string,
  shareCode: string,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET share code valid',
  withRequest: {
    method: 'GET',
    path: `/v1/users/${id}/shareCode/${shareCode}`,
  },
  willRespondWith: {
    status: 200,
  },
});
