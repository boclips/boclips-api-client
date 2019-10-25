import { CollectionFactory } from '../test-support/Collections/factories';
import { getCollectionById } from '../test-support/Collections/interactions';
import { provider } from '../test-support/pactSetup';
import { isATestClient, withClients } from '../test-support/pactTestWrapper';
import { Collection } from '../types';

describe('CollectionsController', () => {
  withClients(getClient => {
    let client;
    beforeEach(async () => {
      client = await getClient();
    });

    it('can fetch a collection', async () => {
      // given:
      if (isATestClient(client)) {
        client.collectionsController.add(
          CollectionFactory.sample({ id: 'test-id' }),
        );
      } else {
        await provider.addInteraction(getCollectionById('test-id'));
      }

      // when:
      const response: Collection = await client.collectionsController.get(
        'test-id',
      );

      // then:
      expect(response.id).toEqual('test-id');
      expect(response.title).toEqual('My Videos edited');
      expect(response.owner).toEqual('owner-id');
      expect(response.updatedAt).toEqual(new Date('2019-10-21T09:11:19.074Z'));
      expect(response.public).toEqual(false);
      expect(response.mine).toEqual(false);
      expect(response.createdBy).toEqual('Teacher');
      expect(response.links).toBeTruthy();
      expect(response.links.self.getOriginalLink()).toContain(
        '/v1/collections/test-id',
      );
    });
  });
});
