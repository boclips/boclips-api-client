import axios from 'axios';
import { HttpBoclipsApiClient } from '../HttpBoclipsApiClient';
import { TestBoclipsApiClient } from '../TestBoclipsApiClient';
import { getAdminLinks } from './interactions/links';
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
          return await HttpBoclipsApiClient.initialize(
            axios.create(),
            provider.mockService.baseUrl,
          );
        } else {
          return new TestBoclipsApiClient();
        }
      };

      // noinspection JSUnusedAssignment
      callTheTests(getClient);
    },
  );
};

export const isATestClient = (
  client: TestBoclipsApiClient | HttpBoclipsApiClient,
): client is TestBoclipsApiClient => {
  return (client as TestBoclipsApiClient).clear !== undefined;
};
