import { InteractionObject, Matchers } from '@pact-foundation/pact';
import axios from 'axios';
import { provider } from '../pactSetup';
import { HttpBoclipsApiClient } from './client';

const { like } = Matchers;

beforeEach(() => {
  return provider.addInteraction({
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
          legalRestrictions: [like({ id: '2', text: 'No restrictions' })],
        },
      },
    },
  } as InteractionObject);
});

it('can process the JSON payload from the provider', async () => {
  const axiosInstance = axios.create({
    baseURL: provider.mockService.baseUrl,
  });

  const client = new HttpBoclipsApiClient(axiosInstance);

  const response = await client.getAllLegalRestrictions();

  expect(response).toHaveLength(1);
  expect(response[0].id).toEqual('2');
  expect(response[0].text).toEqual('No restrictions');
});
