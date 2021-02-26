import { InteractionObject } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/src/dsl/matchers';

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

export const getCurrentUser = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET user',
  withRequest: {
    method: 'GET',
    path: `/v1/users/_self`,
  },
  willRespondWith: {
    status: 200,
    body: {
      id: like('787549c6-d660-439d-8bf1-c8ad788fa266'),
      features: like({ LTI_SLS_TERMS_BUTTON: true }),
    },
  },
});
