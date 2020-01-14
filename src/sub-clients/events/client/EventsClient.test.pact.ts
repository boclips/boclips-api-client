import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import {
  CollectionFactory,
  FakeBoclipsClient,
  isATestClient,
} from '../../../test-support';
import { Link } from '../../common/model/LinkEntity';
import {
  CollectionInteractedWithRequest,
  CollectionInteractionType,
} from '../model/CollectionInteractedWithRequest';
import { PageRenderedRequest } from '../model/PageRenderedRequest';
import {
  collectionID,
  trackCollectionInteraction,
  trackPageRendered,
} from '../pact/EventsInteractions';

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

      it('can track user expired events', async () => {
        // if (!isATestClient(client)) {
        //   await provider.addInteraction(trackUserExpired());
        // }

        await client.eventsClient.trackUserExpired();

        if (isATestClient(client)) {
          const events = client.eventsClient.getEvents();
          expect(events.length).toEqual(1);
        }
      });

      it(`can track collection interaction events`, async () => {
        const request: CollectionInteractedWithRequest = {
          subtype: CollectionInteractionType.NAVIGATE_TO_COLLECTION_DETAILS,
        };

        const collection = CollectionFactory.sample({
          id: collectionID,
          links: {
            self: new Link({
              href: `${provider.mockService.baseUrl}/v1/collections/${collectionID}`,
            }),
            interactedWith: new Link({
              href: `${provider.mockService.baseUrl}/v1/collections/${collectionID}/events`,
            }),
          },
        });

        if (!isATestClient(client)) {
          await provider.addInteraction(
            trackCollectionInteraction(collection, request),
          );
        }

        await client.eventsClient.trackCollectionInteraction(
          { id: collection.id, links: collection.links },
          request,
        );

        if (isATestClient(client)) {
          const events = client.eventsClient.getEvents();
          expect(events.length).toEqual(1);
        }
      });
    },
  );
});
