import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import { trackPageRendered } from '../pact/EventsInteractions';

describe('EventsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;
      beforeEach(async () => {
        client = await getClient();
      });

      it('can track page rendered events', async () => {
        const request: PageRenderedRequest = {
          url: 'http://boclips.com/contract-test',
        };

        if (!isATestClient(client)) {
          await provider.addInteraction(trackPageRendered(request));
        }
        await client.eventsClient.trackPageRendered(request);

        if (isATestClient(client)) {
          const events = client.eventsClient.getEvents();
          expect(events.length).toEqual(1);
        }
      });
    },
  );
});
