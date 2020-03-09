import axios from 'axios';
import { ApiBoclipsClient } from '../ApiBoclipsClient';
import { getAdminLinks } from '../sub-clients/adminLinks/pact/AdminLinksInteractions';
import { FakeBoclipsClient } from '../test-support/FakeBoclipsClient';
import { provider } from './pactSetup';
import rimraf from 'rimraf';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // This is to give the pact mock server time to start

beforeAll(() => {
  rimraf.sync(provider.opts.dir);
  return provider.setup(); // Create mock provider
});
afterAll(() => provider.finalize()); // Tear down the mock and write the pact

export const withClients = (
  callTheTests: (
    client: () => Promise<FakeBoclipsClient | ApiBoclipsClient>,
  ) => void,
) => {
  describe.each([
    ['Real client against Mock Gateway by Pact', true],
    ['Fake client using test data', false],
  ])('contract test using %s', (_: string, shouldUseRealClient: boolean) => {
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
        return Promise.resolve(new FakeBoclipsClient());
      }
    };

    callTheTests(getClient);
  });
};
