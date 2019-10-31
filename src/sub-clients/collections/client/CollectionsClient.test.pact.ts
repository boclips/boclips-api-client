import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import {
  isATestClient,
  withClients,
} from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../test-support';
import { CollectionFactory } from '../../../test-support/CollectionsFactory';
import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import {
  createCollection,
  existingCollectionFromStaging,
  getCollectionById,
  getFilteredCollections,
} from '../pact/CollectionsInteractions';

describe('CollectionsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;
      beforeEach(async () => {
        client = await getClient();
      });

      it('can fetch a collection', async () => {
        // given:
        if (isATestClient(client)) {
          client.collectionsClient.addToFake(
            CollectionFactory.sampleFromId({
              id: existingCollectionFromStaging,
            }),
          );
        } else {
          await provider.addInteraction(
            getCollectionById(existingCollectionFromStaging),
          );
        }

        // when:
        const response: Collection = await client.collectionsClient.get(
          existingCollectionFromStaging,
        );

        // then:
        expect(response.id).toEqual(existingCollectionFromStaging);
        expect(response.title).toEqual('My Videos edited');
        expect(response.owner).toEqual('owner-id');
        expect(response.updatedAt).toEqual(
          new Date('2019-10-21T09:11:19.074Z'),
        );
        expect(response.public).toEqual(false);
        expect(response.mine).toEqual(false);
        expect(response.createdBy).toEqual('Teacher');
        expect(response.links).toBeTruthy();
        expect(response.links.self.getOriginalLink()).toContain(
          `/v1/collections/${existingCollectionFromStaging}`,
        );
      });

      it('can fetch multiple collections', async () => {
        const page = 0;
        const size = 25;
        const projection = 'details';

        if (isATestClient(client)) {
          client.collectionsClient.addToFake(
            CollectionFactory.sampleFromId({
              id: existingCollectionFromStaging,
            }),
          );
        } else {
          await provider.addInteraction(
            getFilteredCollections({
              page,
              size,
              projection,
            }),
          );
        }
        const response: Pageable<
          Collection
        > = await client.collectionsClient.getAllFiltered({
          page,
          size,
          projection,
        });

        expect(response.pageSpec.number).toEqual(page);
        expect(response.pageSpec.size).toEqual(size);
        expect(response.pageSpec.totalElements).toEqual(1);
        expect(response.pageSpec.totalPages).toEqual(0);
        expect(response.page).toHaveLength(1);
      });

      it('can create a collection', async () => {
        const request = {
          title: 'A title',
          description: 'Description of collection',
          videos: [],
          public: true,
        };

        await provider.addInteraction(createCollection(request));
        await client.collectionsClient.create(request);

        if (isATestClient(client)) {
          expect(client.collectionsClient.peekFakeCollections()).toHaveLength(
            1,
          );
        }
      });
    },
  );
});
