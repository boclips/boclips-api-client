import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { provider } from '../../../pact-support/pactSetup';
import { LinkEntity } from '../../common/model/LinkEntity';

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
        createCollection: like({
          href: `${provider.mockService.baseUrl}/v1/collections`,
          templated: false,
        }),
        adminCollectionSearch: like({
          href: `${provider.mockService.baseUrl}/v1/collections{?query,subject,projection,page,size}`,
          templated: true,
        }),
        jobs: like({
          href: `${provider.mockService.baseUrl}/v1/jobs?size={size}&page={page}{&manuallyCreated}`,
          templated: true,
        }),
        ingestVideos: like({
          href: `${provider.mockService.baseUrl}/v1/ingest-videos?size={size}&page={page}`,
          templated: true,
        }),
        jobDetails: like({
          href: `${provider.mockService.baseUrl}/v1/jobs/{id}`,
          templated: true,
        }),
        adminSearch: like(sampleLink),
        orders: like({
          href: `${provider.mockService.baseUrl}/v1/orders`,
          templated: false,
        }),
        exportOrders: like(sampleLink),
        order: like({
          href: `${provider.mockService.baseUrl}/v1/orders/{id}`,
          templated: false,
        }),
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
        trackPageRendered: like({
          href: `${provider.mockService.baseUrl}/v1/events/page-render`,
          templated: false,
        }),
        independentAccounts: like({
          href: `${provider.mockService.baseUrl}/v1/accounts{?countryCode,page,size}`,
          templated: true,
        }),
        videoTypes: like({
          href: `${provider.mockService.baseUrl}/v1/video-types`,
          templated: false,
        }),
        contentCategories: like({
          href: `${provider.mockService.baseUrl}/v1/content-categories`,
          templated: false,
        }),
        tags: like({
          href: `${provider.mockService.baseUrl}/v1/tags`,
          templated: false,
        }),
      },
    },
  },
});
