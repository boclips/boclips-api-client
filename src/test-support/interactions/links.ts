import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { LinkEntity } from '../../types';
import { provider } from '../pactSetup';

const { like } = Matchers;

export const sampleLink: LinkEntity = { href: 'href', templated: false };

export const getAdminLinks = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET Admin Links',
  withRequest: {
    method: 'GET',
    path: '/v1/admin',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/hal+json',
    },
    body: {
      _links: {
        collection: like({
          href: `${provider.mockService.baseUrl}/v1/collections/{id}`,
          templated: true,
        }),
        createCollection: like(sampleLink),
        adminCollectionSearch: like(sampleLink),
        jobs: like(sampleLink),
        jobDetails: like(sampleLink),
        adminSearch: like(sampleLink),
        videos: like(sampleLink),
        orders: like(sampleLink),
        exportOrders: like(sampleLink),
        order: like(sampleLink),
        httpFeeds: like({
          href: `${provider.mockService.baseUrl}/v1/http-feeds{?provider}`,
          templated: true,
        }),
        contentPartners: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners{?name,official,accreditedToYtChannelId}`,
          templated: true,
        }),
        contentPartner: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners/{id}`,
          templated: true,
        }),
        legalRestrictions: like({
          href: `${provider.mockService.baseUrl}/v1/legal-restrictions`,
          templated: false,
        }),
        youtubeFeeds: like({
          href: `${provider.mockService.baseUrl}/v1/http-feeds?provider=youtube`,
          templated: false,
        }),
        createHttpFeed: like({
          href: `${provider.mockService.baseUrl}/v1/http-feeds`,
          templated: false,
        }),
        distributionMethods: like(sampleLink),
        subjects: like({
          href: `${provider.mockService.baseUrl}/v1/subjects`,
          templated: false,
        }),
        searchContracts: like(sampleLink),
      },
    },
  },
});
