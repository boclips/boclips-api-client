import { existingContractFromStaging } from './../../contracts/pact/ContractsInteractions';
import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import {
  ChannelFactory,
  FakeBoclipsClient,
  isATestClient,
} from '../../../test-support';
import {
  existingChannelFromStaging,
  get404Channel,
  getContentCategories,
  getChannelInteraction,
  getChannelsInteraction,
  getSignedLink,
  updateChannel,
} from '../pact/ChannelsInteractions';
import { BoclipsApiError } from '../../../types';
import dayjs from '../../../dayjs/index';

describe('ChannelsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.channels.insertFixture(
            ChannelFactory.sample({
              id: existingChannelFromStaging,
              name: 'a name',
              ingest: {
                type: 'MANUAL',
              },
            }),
          );
        }
      });

      it('can fetch all content partners', async () => {
        await provider.addInteraction(getChannelsInteraction());
        const response = await client.channels.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingChannelFromStaging);
        expect(response[0].name).toEqual('a name');
        expect(response[0].links.self.getOriginalLink()).toContain(
          `/v1/channels/${existingChannelFromStaging}`,
        );
      });

      it('can fetch signed link', async () => {
        const filename = 'file.png';
        await provider.addInteraction(getSignedLink(filename));

        const signedLink = await client.channels.getSignedLink(filename);

        expect(typeof signedLink).toEqual('string');
      });

      it('can fetch a content partner', async () => {
        await provider.addInteraction(
          getChannelInteraction(existingChannelFromStaging),
        );
        const channel = await client.channels.get(existingChannelFromStaging);

        expect(channel.id).toEqual(existingChannelFromStaging);
        expect(channel.name).toEqual('a name');
        expect(channel.currency).toEqual('USD');
        expect(channel.legalRestriction?.id).toEqual('2');
        expect(channel.legalRestriction?.text).toEqual('a legal restriction');
        expect(channel.distributionMethods).toEqual(['STREAM']);
        expect(channel.description).toEqual('this is a description');
        expect(channel.awards).toEqual('Big famous award');
        expect(channel.notes).toEqual('Something noteworthy');
        expect(channel.hubspotId).toEqual('666');
        expect(channel.contentCategories?.[0].key).toEqual('ANY_KEY');
        expect(channel.contentCategories?.[0].label).toEqual('Any label');
        expect(channel.language?.code).toEqual('spa');
        expect(channel.language?.name).toEqual('Spanish');
        expect(channel.contentTypes).toHaveLength(2);
        expect(channel.contentTypes).toContain('NEWS');
        expect(channel.contentTypes).toContain('STOCK');
        expect(channel.pedagogyInformation?.curriculumAligned).toContain('123');
        expect(channel.pedagogyInformation?.educationalResources).toContain(
          '456',
        );
        expect(channel.pedagogyInformation?.isTranscriptProvided).toEqual(true);
        expect(channel.pedagogyInformation?.subjects).toEqual([
          '5cb499c9fd5beb428189454b',
          '5cb499c9fd5beb428189454d',
          '5cb499c9fd5beb428189454e',
        ]);
        expect(channel.pedagogyInformation?.bestForTags).toEqual([
          '5d3ac0175b3f3b7ba335e104',
          '5d3ac0185b3f3b7ba335e106',
          '5d3ac0185b3f3b7ba335e105',
        ]);
        expect(channel.pedagogyInformation?.ageRanges.min).toEqual(10);
        expect(channel.pedagogyInformation?.ageRanges.max).toEqual(20);
        expect(channel.pedagogyInformation?.ageRanges.label).toEqual('10-20');
        expect(channel.pedagogyInformation?.ageRanges.ids).toEqual(['123']);

        expect(channel.oneLineDescription).toEqual(
          '30-year-old mulberry field',
        );
        expect(channel.marketingInformation?.status).toEqual('IN_PROGRESS');
        expect(channel.marketingInformation?.logos).toEqual([
          'logo1.png',
          'logo2.png',
        ]);
        expect(channel.marketingInformation?.showreel).toEqual('showreel.mkv');
        expect(channel.marketingInformation?.sampleVideos).toEqual([
          'sample1.avi',
          'sample2.avi',
        ]);
        expect(channel.ingest?.type).toEqual('MANUAL');
        expect(channel.ingest?.urls).toBeUndefined();
      });

      it('can update a content partner', async () => {
        await provider.addInteraction(
          updateChannel(existingChannelFromStaging),
        );
        await client.channels.update(existingChannelFromStaging, {
          name: 'TED',
          ageRanges: ['early-years'],
          contractId: existingContractFromStaging,
          ingest: {
            type: 'MRSS',
            urls: ['https://mrss.feed'],
          },
          deliveryFrequency: dayjs.duration(3, 'month'),
        });
      });

      it('can get content partner categories', async () => {
        await provider.addInteraction(getContentCategories());

        const contentCategories = await client.channels.getContentCategories();

        expect(contentCategories.categories[0].key).toContain('key 1');
        expect(contentCategories.categories[0].label).toContain('label 1');
      });

      it('gives a useful error message on a 404', async () => {
        await provider.addInteraction(get404Channel('404'));

        let error: BoclipsApiError | null = null;
        try {
          await client.channels.get('404');
        } catch (err) {
          error = err;
        }

        expect(error?.status).toEqual(404);
        expect(error?.message).toBeDefined();
        expect(error?.path).toBeDefined();
        expect(error?.timestamp).toBeDefined();
        expect(error?.error).toBeDefined();
      });
    },
  );
});
