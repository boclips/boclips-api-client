import { CollectionFactory } from '../../../test-support/CollectionsFactory';
import { provider } from '../../../pact-support/pactSetup';
import {
  isATestClient,
  withClients,
} from '../../../pact-support/pactTestWrapper';
import { Collection } from '../model/Collection';
import {
  existingCollectionFromStaging,
  getCollectionById,
} from '../pact/CollectionsInteractions';

describe('CollectionsClient', () => {
  withClients(getClient => {
    let client;
    beforeEach(async () => {
      client = await getClient();
    });

    it('can fetch a collection', async () => {
      // given:
      if (isATestClient(client)) {
        client.collectionsClient.add(
          CollectionFactory.sample({ id: existingCollectionFromStaging }),
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
      expect(response.updatedAt).toEqual(new Date('2019-10-21T09:11:19.074Z'));
      expect(response.public).toEqual(false);
      expect(response.mine).toEqual(false);
      expect(response.createdBy).toEqual('Teacher');
      expect(response.links).toBeTruthy();
      expect(response.links.self.getOriginalLink()).toContain(
        `/v1/collections/${existingCollectionFromStaging}`,
      );
    });
  });
});
