import { InteractionObject, Matchers } from '@pact-foundation/pact';

const { eachLike, like } = Matchers;

export const exisitingJobIdFromStaging = 'CSV_190917_1455_2';

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
          id: exisitingJobIdFromStaging,
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
          _links: like({
            self: { href: `v1/jobs/${exisitingJobIdFromStaging}` },
          }),
        }),
      },
    },
  },
});

export const getJobInteraction = (id: string): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET job',
  withRequest: {
    method: 'GET',
    path: `/v1/jobs/${id}`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json;charset=UTF-8',
    },
    body: like({
      id,
      createdAt: '2019-11-21T17:00:00.908',
      provider: 'Getty',
      status: 'INGESTING',
      videoSummary: like({
        totalErrors: 1,
        totalErroredVideos: 1,
        totalSuccessfulVideos: 1,
        totalIgnoredVideos: 0,
      }),
      videos: eachLike({
        id: 'a video id',
        title: 'Why did the banana cross the road?',
        status: 'SUCCESS',
        errors: [],
      }),
      _links: like({ self: { href: `v1/jobs/${id}` } }),
    }),
  },
});
