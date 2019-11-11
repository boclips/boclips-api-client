import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../test-support';
import { CollectionFactory } from '../../../test-support/CollectionsFactory';
import Pageable from '../../common/model/Pageable';
import { Collection } from '../model/Collection';
import {
  AttachmentRequest,
  UpdateCollectionRequest,
} from '../model/CollectionRequest';
import {
  createCollection,
  existingCollectionFromStaging,
  getCollectionById,
  getFilteredCollections,
  updateCollection,
} from '../pact/CollectionsInteractions';
import { WithClientsOptions } from './../../../pact-support/pactTestWrapper';
import { FakeCollectionsClient } from './FakeCollectionsClient';

describe('CollectionsClient', () => {
  let isATestClientRun: boolean;
  withClients(
    (
      getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>,
      options: WithClientsOptions,
    ) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;
      beforeEach(async () => {
        client = await getClient();
        isATestClientRun = !options.isRealClient;
      });

      it('can fetch a collection', async () => {
        // given:
        if (isATestClientRun) {
          (client.collectionsClient as FakeCollectionsClient).addToFake(
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

        if (isATestClientRun) {
          (client.collectionsClient as FakeCollectionsClient).addToFake(
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
        const title = 'A title';
        const description = 'Description of collection';
        const videos = [];
        const isPublic = true;
        const expectedId = 'abc123-id';

        if (isATestClientRun) {
          (client.collectionsClient as FakeCollectionsClient).setNextIdForFake(
            expectedId,
          );
        }

        const request = {
          title,
          description,
          videos,
          public: isPublic,
        };

        await provider.addInteraction(createCollection(request, expectedId));
        const collectionId = await client.collectionsClient.create(request);
        expect(collectionId).toEqual(expectedId);

        if (isATestClientRun) {
          const newCollection = await client.collectionsClient.get(
            collectionId,
          );
          expect(newCollection.title).toEqual(title);
          expect(newCollection.description).toEqual(description);
          expect(newCollection.videos).toEqual(videos);
          expect(newCollection.public).toEqual(isPublic);
        }
      });

      it('can update a collection', async () => {
        const collectionId = existingCollectionFromStaging;
        const updatedFields: UpdateCollectionRequest = {
          title: 'new title',
          description: 'new description',
          attachment: {
            linkToResource: 'http://link.test.com/test',
            description: 'This is a description',
            type: 'LESSON_PLAN',
          },
        };

        if (isATestClientRun) {
          (client.collectionsClient as FakeCollectionsClient).addToFake(
            CollectionFactory.sample({ id: collectionId }),
          );
        }

        await provider.addInteraction(
          updateCollection(collectionId, updatedFields),
        );

        await client.collectionsClient.update(collectionId, updatedFields);

        if (isATestClientRun) {
          const updatedCollection = await client.collectionsClient.get(
            collectionId,
          );
          expect(updatedCollection.title).toEqual(updatedFields.title);
          expect(updatedCollection.description).toEqual(
            updatedFields.description,
          );
          expect(updatedCollection.attachments).toHaveLength(1);
          const newAttachment: AttachmentRequest =
            updatedCollection.attachments[0];
          expect(newAttachment.description).toEqual(
            updatedFields.attachment.description,
          );
          expect(newAttachment.linkToResource).toEqual(
            updatedFields.attachment.linkToResource,
          );
          expect(newAttachment.type).toEqual(updatedFields.attachment.type);
        }
      });
    },
  );
});
