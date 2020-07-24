import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';

import { ContentPackage } from '../model/ContentPackage';
import {
  getContentPackage,
  getContentPackages,
  updateContentPackage,
} from '../pact/ContentPackageInteractions';

describe('ContentPackagesClient', () => {
  const contentPackageIdFromStaging = '5f10296408f6a1cbd2745c98';

  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentPackages.insert({
            id: contentPackageIdFromStaging,
            name: 'DO NOT EDIT api-client fixture',
            accessRules: [
              {
                videoIds: ['5c5db74e7f45b9000159bf3f'],
                type: 'ExcludedVideos',
              },
            ],
          });
        }
      });

      it('can fetch all content packages', async () => {
        await provider.addInteraction(getContentPackages);
        const response = await client?.contentPackages.getAll();

        expect(response).toHaveLength(1);
        expect(response?.[0].id).toEqual(contentPackageIdFromStaging);
        expect(response?.[0].name).toEqual('DO NOT EDIT api-client fixture');
      });

      it('can fetch a content package by id', async () => {
        await provider.addInteraction(
          getContentPackage(contentPackageIdFromStaging),
        );
        const response = await client.contentPackages.get(
          contentPackageIdFromStaging,
        );

        expect(response?.id).toEqual(contentPackageIdFromStaging);
        expect(response?.name).toEqual('DO NOT EDIT api-client fixture');
        expect(response?.accessRules[0].type).toEqual('ExcludedVideos');
        expect(response?.accessRules[0].videoIds).toEqual([
          '5c5db74e7f45b9000159bf3f',
        ]);
      });

      it('can update content package by id', async () => {
        await provider.addInteraction(
          updateContentPackage(
            contentPackageIdFromStaging,
            'DO NOT EDIT api-client fixture',
          ),
        );
        const newContentPackage: ContentPackage = {
          name: 'DO NOT EDIT api-client fixture',
          accessRules: [
            {
              videoIds: ['5c5db74e7f45b9000159bf3f'],
              type: 'ExcludedVideos',
            },
          ],
        };
        const response = await client.contentPackages.replace(
          contentPackageIdFromStaging,
          newContentPackage,
        );

        expect(response?.id).toEqual(contentPackageIdFromStaging);
        expect(response?.name).toEqual('DO NOT EDIT api-client fixture');
        expect(response?.accessRules).toHaveLength(1);
        expect(response?.accessRules[0].type).toEqual('ExcludedVideos');
        expect(response?.accessRules[0].videoIds).toContain(
          '5c5db74e7f45b9000159bf3f',
        );
      });
    },
  );
});
