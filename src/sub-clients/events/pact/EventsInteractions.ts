import { InteractionObject } from '@pact-foundation/pact';
import { PageRenderedRequest } from '../model/PageRenderedRequest';

export const trackPageRendered = (
  request: PageRenderedRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'POST trackPageRendered event',
  withRequest: {
    method: 'POST',
    path: `/v1/events/page-render`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      url: request.url,
    },
  },
  willRespondWith: {
    status: 201,
  },
});
