import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import {
  getContentPackage,
  getContentPackages,
} from '../pact/GetContentPackages';
import { AccessRuleType } from '../model/ContentPackage';

describe('ContentPackagesClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient | null = null;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentPackages.insert({
            id: '5e6bbe1e8e91eae3fb4977ca',
            name: 'My content package',
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
        expect(response?.[0].id).toEqual('5e6bbe1e8e91eae3fb4977ca');
        expect(response?.[0].name).toEqual('My content package');
      });

      it('can fetch a content package by id', async () => {
        const contentPackageIdFromStaging = '5e6bbe1e8e91eae3fb4977ca';
        await provider.addInteraction(getContentPackage());
        const response = await client?.contentPackages.get(
          contentPackageIdFromStaging,
        );
        expect(response?.id).toEqual('5e6bbe1e8e91eae3fb4977ca');
        expect(response?.name).toEqual('My content package');
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
