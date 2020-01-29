import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { JobsFilterRequest } from './../model/JobsFilterRequest';

const { eachLike, like } = Matchers;

export const existingJobIdFromStaging = 'CSV_200120_1212_4';

export const getJobsInteraction = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET jobs',
  withRequest: {
    method: 'GET',
    path: '/v1/jobs',
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
        jobs: eachLike({
          id: existingJobIdFromStaging,
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
            self: { href: `v1/jobs/${existingJobIdFromStaging}` },
          }),
        }),
      },
      _links: like({
        next: { href: 'https://api.staging-boclips.com/v1/jobs?page=1&size=2' },
        prev: { href: 'https://api.staging-boclips.com/v1/jobs?page=1&size=2' },
      }),
    },
  },
});

export const getFilteredJobsInteraction = (
  filterRequest: JobsFilterRequest,
): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET filtered jobs',
  withRequest: {
    method: 'GET',
    path: '/v1/jobs',
    query: `size=2&page=1${
      filterRequest.manuallyCreated
        ? '&manuallyCreated=' + filterRequest.manuallyCreated
        : ''
    }`,
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json',
    },
    body: {
      page: like({ size: 2, totalElements: 1, totalPages: 1, number: 1 }),
      _embedded: {
        jobs: eachLike({
          id: existingJobIdFromStaging,
          createdAt: '2019-11-21T17:00:00.908',
          provider: 'Getty',
          status: 'ERROR',
          videoSummary: like({
            totalErrors: 1,
            totalErroredVideos: 1,
            totalSuccessfulVideos: 1,
            totalIgnoredVideos: 0,
          }),
          videos: [],
          _links: like({
            self: { href: `v1/jobs/${existingJobIdFromStaging}` },
          }),
        }),
      },
      _links: like({
        next: { href: 'https://api.staging-boclips.com/v1/jobs?page=1&size=5' },
        prev: { href: 'https://api.staging-boclips.com/v1/jobs?page=1&size=5' },
      }),
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
      'Content-Type': 'application/hal+json',
    },
    body: like({
      id,
      createdAt: like('2019-11-21T17:00:00.908'),
      provider: like('Getty'),
      status: like('INGESTING'),
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
        errors: eachLike('error description'),
      }),
      _links: like({ self: { href: `v1/jobs/${id}` } }),
    }),
  },
});
