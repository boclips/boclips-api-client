import { ingestVideoFixture } from './../client/IngestVideosClient.test.pact';
import { InteractionObject, Matchers } from '@pact-foundation/pact';
const { eachLike, like } = Matchers;

export const getIngestVideosInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET IngestVideos',
  withRequest: {
    method: 'GET',
    path: '/v1/ingest-videos',
    query: 'size=2&page=1',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json',
    },
    body: {
      page: like({ size: 2, totalElements: 1, totalPages: 1, number: 1 }),
      _embedded: {
        ingestVideos: eachLike({
          id: ingestVideoFixture.id,
          title: ingestVideoFixture.title,
          status: ingestVideoFixture.status,
          ingestStartedAt: ingestVideoFixture.ingestStartedAt.toISOString(),
          contentPartner: like({ ...ingestVideoFixture.contentPartner }),
          ingestJob: like({ ...ingestVideoFixture.ingestJob }),
        }),
      },
      _links: like({
        next: {
          href:
            'https://api.staging-boclips.com/v1/ingest-videos?page=1&size=2',
        },
        prev: {
          href:
            'https://api.staging-boclips.com/v1/ingest-videos?page=1&size=2',
        },
      }),
    },
  },
});
