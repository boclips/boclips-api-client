import axios from 'axios';
import { provider } from '../pactSetup';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import {
  getContentPartner,
  getContentPartners,
} from './test_support/interactions/contentPartners';
import { getLegalRestrictions } from './test_support/interactions/legalRestrictions';
import { getBackofficeLinks } from './test_support/interactions/links';

beforeEach(async () => {
  provider.addInteraction(getBackofficeLinks());
});

describe('legalRestrictions contract test', () => {
  beforeEach(() => {
    provider.addInteraction(getLegalRestrictions);
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
    beforeEach(() => {
      provider.addInteraction(getContentPartners());
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
      expect(response[0].ageRange).toEqual({ min: 10, max: 15 });
      expect(response[0].official).toEqual(true);
      expect(response[0].currency).toEqual('USD');
      expect(response[0].distributionMethods).toContainEqual('STREAM');
      expect(response[0].legalRestrictions).toHaveLength(1);
    });
  });

  describe('one', () => {
    beforeEach(() => {
      provider.addInteraction(getContentPartner('2'));
    });

    it('can fetch a content partner', async () => {
      const axiosInstance = axios.create();

      const client = await HttpBoclipsApiClient.initalize(
        axiosInstance,
        provider.mockService.baseUrl,
      );

      const contentPartner = await client.contentPartnersController.get('2');

      expect(contentPartner.id).toEqual('2');
      expect(contentPartner.name).toEqual('a name');
      expect(contentPartner.ageRange).toEqual({ min: 10, max: 15 });
      expect(contentPartner.official).toEqual(true);
      expect(contentPartner.currency).toEqual('USD');
      expect(contentPartner.distributionMethods).toContainEqual('STREAM');
      expect(contentPartner.legalRestrictions).toHaveLength(1);
    });
  });
});
