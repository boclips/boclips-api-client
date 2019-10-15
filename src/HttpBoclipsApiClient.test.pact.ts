import axios from 'axios';
import { provider } from '../pactSetup';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import {
  getContentPartnerInteraction,
  getContentPartnersInteraction,
} from './test_support/interactions/contentPartnersInteractions';
import { getLegalRestrictions } from './test_support/interactions/legalRestrictions';
import { getBackofficeLinks } from './test_support/interactions/links';

beforeEach(async () => {
  await provider.addInteraction(getBackofficeLinks());
});

describe('legalRestrictions contract test', () => {
  beforeEach(async () => {
    await provider.addInteraction(getLegalRestrictions);
  });

  it('can fetch all legal restrictions', async () => {
    const axiosInstance = axios.create();

    const client = await HttpBoclipsApiClient.initalize(
      axiosInstance,
      provider.mockService.baseUrl,
    );
    const response = await client.legalRestrictionsController.getAll();

    expect(response).toHaveLength(1);
    expect(response[0].id).toEqual('2');
    expect(response[0].text).toEqual('No restrictions');
  });
});

describe('contentPartners contract test', () => {
  describe('all', () => {
    beforeEach(async () => {
      await provider.addInteraction(getContentPartnersInteraction());
    });

    it('can fetch all content partners', async () => {
      const axiosInstance = axios.create();

      const client = await HttpBoclipsApiClient.initalize(
        axiosInstance,
        provider.mockService.baseUrl,
      );

      const response = await client.contentPartnersController.getAll();

      expect(response).toHaveLength(1);
      expect(response[0].id).toEqual('1');
      expect(response[0].name).toEqual('a name');
      expect(response[0].official).toEqual(true);
      expect(response[0]._links.self.href).toContain('/v1/content-partners/1');
    });
  });

  describe('one', () => {
    beforeEach(async () => {
      await provider.addInteraction(
        getContentPartnerInteraction('5cf140c4c1475c47f7178678'),
      );
    });

    it('can fetch a content partner', async () => {
      const axiosInstance = axios.create();

      const client = await HttpBoclipsApiClient.initalize(
        axiosInstance,
        provider.mockService.baseUrl,
      );

      const contentPartner = await client.contentPartnersController.get(
        '5cf140c4c1475c47f7178678',
      );

      expect(contentPartner.id).toEqual('5cf140c4c1475c47f7178678');
      expect(contentPartner.name).toEqual('a name');
      expect(contentPartner.official).toEqual(true);
      expect(contentPartner.currency).toEqual('USD');
      expect(contentPartner.ageRange.min).toEqual(10);
      expect(contentPartner.ageRange.max).toEqual(20);
      expect(contentPartner.ageRange.label).toEqual('10-20');
      expect(contentPartner.legalRestrictions.id).toEqual('2');
      expect(contentPartner.legalRestrictions.text).toEqual(
        'a legal restriction',
      );
      expect(contentPartner.distributionMethods).toEqual(['STREAM']);
    });
  });
});
