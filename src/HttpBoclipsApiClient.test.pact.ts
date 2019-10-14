import { InteractionObject, Matchers } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import axios from 'axios';
import { provider } from '../pactSetup';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import Link from './types/Link';

const { eachLike } = Matchers;

beforeAll(() => {
  const sampleLink: Link = { href: 'href', templated: false };
  const backofficeLinks: InteractionObject = {
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
          contentPartners: like(sampleLink),
          contentPartner: like(sampleLink),
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
  };

  const getLegalRestrictions: InteractionObject = {
    state: undefined,
    uponReceiving: 'GET legal restrictions',
    withRequest: {
      method: 'GET',
      path: '/v1/legal-restrictions',
    },
    willRespondWith: {
      status: 200,
      headers: {
        'Content-Type': 'application/hal+json;charset=UTF-8',
      },
      body: {
        _embedded: {
          legalRestrictions: eachLike({ id: '2', text: 'No restrictions' }),
        },
      },
    },
  };
  provider.addInteraction(backofficeLinks);
  provider.addInteraction(getLegalRestrictions);
  return provider;
});

it('can process LegalRestrictions', async () => {
  const axiosInstance = axios.create();

  const client = await HttpBoclipsApiClient.initalize(
    axiosInstance,
    provider.mockService.baseUrl,
  );

  const response = await client.getAllLegalRestrictions();

  expect(response).toHaveLength(1);
  expect(response[0].id).toEqual('2');
  expect(response[0].text).toEqual('No restrictions');
});
