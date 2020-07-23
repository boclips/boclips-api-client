import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import {
  getContentPackage,
  getContentPackages, updateContentPackage,
} from '../pact/GetContentPackages';
import { AccessRuleType, ContentPackage } from '../model/ContentPackage';

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
                type: 'ExcludedVideos' as AccessRuleType,
              },
              {
                channelIds: ['5cfe89e4336c6d2d0aa7c00d'],
                type: 'ExcludedChannels' as AccessRuleType,
              },
              {
                type: 'IncludedDistributionMethods' as AccessRuleType,
                distributionMethods: ['STREAM'],
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
        await provider.addInteraction(getContentPackage(contentPackageIdFromStaging));
        const response = await client.contentPackages.get(
          contentPackageIdFromStaging,
        );

        expect(response?.id).toEqual(contentPackageIdFromStaging);
        expect(response?.name).toEqual('DO NOT EDIT api-client fixture');
        expect(response?.accessRules).toHaveLength(3);
        expect(response?.accessRules[0].type).toEqual('ExcludedVideos');
        expect(response?.accessRules[0].videoIds).toContain(
          '5c5db74e7f45b9000159bf3f',
        );

        expect(response?.accessRules[1].type).toEqual('ExcludedChannels');
        expect(response?.accessRules[2].type).toEqual(
          'IncludedDistributionMethods',
        );
      });


      it('can update content package by id', async () => {
        const newContentPackage: ContentPackage = {
          name: 'DO NOT EDIT api-client fixture',
          accessRules: [
            {
              videoIds: ['5c5db74e7f45b9000159bf3f'],
              type: 'ExcludedVideos' as AccessRuleType,
            },
            {
              channelIds: ['5cfe89e4336c6d2d0aa7c00d'],
              type: 'ExcludedChannels' as AccessRuleType,
            },
            {
              type: 'IncludedDistributionMethods' as AccessRuleType,
              distributionMethods: ['STREAM'],
            },
          ]
        }
        await provider.addInteraction(updateContentPackage(contentPackageIdFromStaging, 'DO NOT EDIT api-client fixture'));
        const response = await client.contentPackages.replace(
          contentPackageIdFromStaging,
            newContentPackage
        );

        expect(response?.id).toEqual(contentPackageIdFromStaging);
        expect(response?.name).toEqual('DO NOT EDIT api-client fixture');
        expect(response?.accessRules).toHaveLength(3);
        expect(response?.accessRules[0].type).toEqual('ExcludedVideos');
        expect(response?.accessRules[0].videoIds).toContain(
          '5c5db74e7f45b9000159bf3f',
        );

        expect(response?.accessRules[1].type).toEqual('ExcludedChannels');
        expect(response?.accessRules[2].type).toEqual(
          'IncludedDistributionMethods',
        );
      });
    },
  );
});
