import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { Link } from '../../types';
import { provider } from '../pactSetup';

const { like, term } = Matchers;

export const sampleLink: Link = { href: 'href', templated: false };

export const getBackofficeLinks = (): InteractionObject => ({
  state: undefined,
  uponReceiving: 'GET Backoffice Links',
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
        httpFeeds: like(sampleLink),
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
        youtubeFeeds: like(sampleLink),
        createHttpFeed: like(sampleLink),
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
