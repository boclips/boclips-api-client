import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { Link } from '../../types';
import { provider } from '../pactSetup';

const { like } = Matchers;

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
        contentPartners: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners`,
          templated: false,
        }),
        contentPartner: like({
          href: `${provider.mockService.baseUrl}/v1/content-partners/{id}`,
          templated: true,
        }),
        legalRestrictions: like({
          href: `${provider.mockService.baseUrl}/v1/legal-restrictions`,
          templated: false,
        }),
        youtubeFeeds: like(sampleLink),
        createHttpFeed: like(sampleLink),
        distributionMethods: like(sampleLink),
        subjects: like(sampleLink),
        searchContracts: like(sampleLink),
      },
    },
  },
});
