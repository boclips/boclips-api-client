import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import {
  createHttpFeed,
  getHttpFeeds,
} from './test-support/interactions/httpFeeds';
import { provider } from './test-support/pactSetup';
import { isATestClient, withClients } from './test-support/pactTestWrapper';
import { TestBoclipsApiClient } from './TestBoclipsApiClient';

describe('FeedController', () => {
  withClients(
    (getClient: () => Promise<TestBoclipsApiClient | HttpBoclipsApiClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          (client as TestBoclipsApiClient).feedsController.insert({
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

        await client.feedsController.create({
          name: 'Feed Test',
          url: 'https://www.test.com/',
          provider: 'Youtube',
          format: 'YOUTUBE',
        });
      });

      it('can fetch all feeds', async () => {
        if (!isATestClient(client)) {
          await provider.addInteraction(getHttpFeeds('youtube'));
        }

        const response = await client.feedsController.getAll('youtube');

        expect(response).toHaveLength(1);
        expect(response[0].name).toEqual('test name');
        expect(response[0].url).toEqual('test url');
        expect(response[0].provider).toEqual('youtube');
      });
    },
  );
});
