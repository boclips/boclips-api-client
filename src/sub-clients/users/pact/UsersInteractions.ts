import { InteractionObject } from '@pact-foundation/pact';

export const inactiveUser = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET inactive user',
  withRequest: {
    method: 'GET',
    path: `/v1/users/${id}/active`,
  },
  willRespondWith: {
    status: 403,
  },
});

export const activeUser = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET active user',
  withRequest: {
    method: 'GET',
    path: `/v1/users/${id}/active`,
  },
  willRespondWith: {
    status: 200,
  },
});
