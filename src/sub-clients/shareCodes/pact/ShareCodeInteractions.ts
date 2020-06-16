import { InteractionObject } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';

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
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: like({
      error: 'Forbidden',
      message: 'Request failed',
      path: `/v1/users/${id}/shareCode/${shareCode}`,
      status: 404,
      timestamp: new Date(Date.parse('01/01/2000')).toUTCString(),
    }),
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
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
});
