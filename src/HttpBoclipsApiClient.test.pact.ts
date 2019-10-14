import axios from 'axios';
import { provider } from '../pactSetup';
import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import { getLegalRestrictions } from './test_suppprt/interactions/legalRestrictions';
import { getBackofficeLinks } from './test_suppprt/interactions/links';

beforeAll(() => {
  provider.addInteraction(getBackofficeLinks());
  provider.addInteraction(getLegalRestrictions);
  return provider;
});

it('can process LegalRestrictions', async () => {
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
