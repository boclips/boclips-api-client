import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../test-support/FakeBoclipsClient';
import { createHttpFeed, getHttpFeeds } from '../pact/HttpFeedsInteraction';
import { WithClientsOptions } from './../../../pact-support/pactTestWrapper';

describe('HttpFeedsClient', () => {
  withClients(
    (
      getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>,
      options: WithClientsOptions,
    ) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (!options.isRealClient) {
          (client as FakeBoclipsClient).feedsClient.insert({
            name: 'test name',
            url: 'test url',
            provider: 'youtube',
          });
        }
      });

      /* TODO remove created test feed after verification, so the next time we can create it again
                    currently this would fail when testing against staging, because the feed is duplicate
                */
      xit('can create new feed', async () => {
        await provider.addInteraction(createHttpFeed); // TODO(AO): Is it possible to skip verification of this interaction?

        await client.feedsClient.create({
          name: 'Feed Test',
          url: 'https://www.test.com/',
          provider: 'Youtube',
          format: 'YOUTUBE',
        });
      });

      it('can fetch all feeds', async () => {
        await provider.addInteraction(getHttpFeeds('youtube'));

        const response = await client.feedsClient.getAll('youtube');

        expect(response).toHaveLength(1);
        expect(response[0].name).toEqual('test name');
        expect(response[0].url).toEqual('test url');
        expect(response[0].provider).toEqual('youtube');
      });
    },
  );
});
