import { InteractionObject } from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';

export const getIngestVideoStatusesInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET ingest video statuses',
  withRequest: {
    method: 'GET',
    path: '/v1/ingest-video-statuses',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json',
    },
    body: {
      _embedded: {
        ingestVideoStatuses: eachLike('a status'),
      },
    },
  },
});
