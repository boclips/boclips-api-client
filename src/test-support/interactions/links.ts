import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { Link } from '../../types';
import { provider } from '../pactSetup';

const { like, term } = Matchers;

export const sampleLink: Link = { href: 'href', templated: false };

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
        collection: like(sampleLink),
        createCollection: like(sampleLink),
        adminCollectionSearch: like(sampleLink),
        jobs: like(sampleLink),
        jobDetails: like(sampleLink),
        adminSearch: like(sampleLink),
        videos: like(sampleLink),
        orders: like(sampleLink),
        exportOrders: like(sampleLink),
        order: like(sampleLink),
        httpFeeds: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/http-feeds{?provider}`,
            matcher: '/v1/http-feeds{\\?provider}',
          }),
          templated: true,
        },
        contentPartners: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/content-partners{?name,official,accreditedToYtChannelId}`,
            matcher:
              '.*/v1/content-partners{\\?name,official,accreditedToYtChannelId}',
          }),
          templated: true,
        },
        contentPartner: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/content-partners/{id}`,
            matcher: '.*/v1/content-partners/{id}',
          }),
          templated: true,
        },
        legalRestrictions: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/legal-restrictions`,
            matcher: '.*/v1/legal-restrictions',
          }),
          templated: false,
        },
        youtubeFeeds: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/http-feeds?provider=youtube}`,
            matcher: '/v1/http-feeds\\?provider=youtube',
          }),
          templated: false,
        },
        createHttpFeed: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/http-feeds`,
            matcher: '/v1/http-feeds',
          }),
          templated: false,
        },
        distributionMethods: like(sampleLink),
        subjects: {
          href: term({
            generate: `${provider.mockService.baseUrl}/v1/subjects`,
            matcher: '.*/v1/subjects',
          }),
          templated: false,
        },
        searchContracts: like(sampleLink),
      },
    },
  },
});
