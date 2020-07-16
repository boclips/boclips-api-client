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
  trackAnonymousPlatformInteraction,
  trackCollectionInteraction,
  trackPageRendered,
  trackPlatformInteraction,
  trackSearchQueryCompletionsSuggested,
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

        await client.events.trackPageRendered(request);

        if (isATestClient(client)) {
          const events = client.events.getEvents();
          expect(events.length).toEqual(1);
        }
      });

      it('can track user expired events', async () => {
        // if (!isATestClient(client)) {
        //   await provider.addInteraction(trackUserExpired());
        // }

        await client.events.trackUserExpired();

        if (isATestClient(client)) {
          const events = client.events.getEvents();
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

        const overwriteReferer = 'http://www.boclips.com';
        if (!isATestClient(client)) {
          await provider.addInteraction(
            trackCollectionInteraction(collection, request, overwriteReferer),
          );
        }

        await client.events.trackCollectionInteraction(
          { id: collection.id, links: collection.links },
          request,
          overwriteReferer,
        );

        if (isATestClient(client)) {
          const events = client.events.getEvents();
          expect(events.length).toEqual(1);
        }
      });

      it(`can track platform interaction events`, async () => {
        await provider.addInteraction(
          trackPlatformInteraction('CONTRACT_TEST_CLICK'),
        );

        await client.events.trackPlatformInteraction('CONTRACT_TEST_CLICK');

        if (isATestClient(client)) {
          const events = client.events.getEvents();
          expect(events.length).toEqual(1);
          expect(events[0]).toEqual({
            type: 'PLATFORM_INTERACTED_WITH',
            subtype: 'CONTRACT_TEST_CLICK',
          });
        }
      });

      it(`can track anonymous platform interaction events`, async () => {
        await provider.addInteraction(
          trackAnonymousPlatformInteraction('CONTRACT_TEST_CLICK'),
        );

        await client.events.trackPlatformInteraction(
          'CONTRACT_TEST_CLICK',
          true,
        );

        if (isATestClient(client)) {
          const events = client.events.getEvents();
          expect(events.length).toEqual(1);
          expect(events[0]).toEqual({
            type: 'PLATFORM_INTERACTED_WITH',
            subtype: 'CONTRACT_TEST_CLICK',
            anonymous: true,
          });
        }
      });

      it(`can track suggested search query completion events`, async () => {
        const request = {
          searchQuery: 'bio',
          impressions: ['biology', 'biodiversity'],
          componentId: 'component-id',
          completionId: 'completion-id',
        };

        await provider.addInteraction(
          trackSearchQueryCompletionsSuggested(request),
        );

        await client.events.trackSearchQueryCompletionsSuggested(request);

        if (isATestClient(client)) {
          const events = client.events.getEvents();

          expect(events.length).toEqual(1);
          expect(events[0]).toEqual({
            searchQuery: 'bio',
            impressions: ['biology', 'biodiversity'],
            componentId: 'component-id',
            completionId: 'completion-id',
          });
        }
      });
    },
  );
});
