import axios from 'axios';
import { ApiBoclipsClient } from '../ApiBoclipsClient';
import { getAdminLinks } from '../clients/adminLinks/pact/AdminLinksInteractions';
import { FakeBoclipsClient } from '../test-support/FakeBoclipsClient';
import { provider } from './pactSetup';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // This is to give the pact mock server time to start

beforeAll(() => provider.setup()); // Create mock provider
afterAll(() => provider.finalize()); // Tear down the mock and write the pact

export const withClients = (callTheTests: (client) => void) => {
  describe.each([['Real client', true], ['Fake client', false]])(
    'contract test using %s',
    (_: string, shouldUseRealClient: boolean) => {
      beforeAll(() => {
        if (shouldUseRealClient) {
          return provider.addInteraction(getAdminLinks());
        }
      });

      afterEach(() => {
        if (shouldUseRealClient) {
          return provider.verify();
        }
      });

      const getClient = async () => {
        if (shouldUseRealClient) {
          return await ApiBoclipsClient.initialize(
            axios.create(),
            provider.mockService.baseUrl,
          );
        } else {
          return new FakeBoclipsClient();
        }
      };

      // noinspection JSUnusedAssignment
      callTheTests(getClient);
    },
  );
};

export const isATestClient = (
  client: FakeBoclipsClient | ApiBoclipsClient,
): client is FakeBoclipsClient => {
  return (client as FakeBoclipsClient).clear !== undefined;
};
