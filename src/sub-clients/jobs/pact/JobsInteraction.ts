import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike, like } = Matchers;

export const getJobsInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET jobs',
  withRequest: {
    method: 'GET',
    path: '/v1/jobs',
    query: 'size=5&page=0',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: {
      page: like({ size: 5, totalElements: 1, totalPages: 1, number: 0 }),
      _embedded: {
        jobs: eachLike({
          id: 'THE_JOB_ID',
          createdAt: '2019-11-21T17:00:00.908',
          provider: 'Getty',
          status: 'INGESTING',
          videoSummary: like({
            totalErrors: 1,
            totalErroredVideos: 1,
            totalSuccessfulVideos: 1,
            totalIgnoredVideos: 0,
          }),
          videos: [],
          _links: like({ self: { href: 'v1/jobs/THE_JOB_ID' } }),
        }),
      },
    },
  },
});
