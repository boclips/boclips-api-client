import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import {
  ContentPartnerFactory,
  FakeBoclipsClient,
  isATestClient,
} from '../../../test-support';
import {
  existingContentPartnerFromStaging,
  get404ContentPartner,
  getContentCategories,
  getContentPartnerInteraction,
  getContentPartnersInteraction,
  getSignedLink,
  updateContentPartner,
} from '../pact/ContentPartnersInteractions';
import { BoclipsApiError } from '../../../types';
import moment from 'moment';

describe('ContentPartnersClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentPartners.insertContentPartnerFixture(
            ContentPartnerFactory.sample({
              id: existingContentPartnerFromStaging,
              name: 'a name',
              official: true,
              ingest: {
                type: 'MANUAL',
              },
            }),
          );
        }
      });

      it('can fetch all content partners', async () => {
        await provider.addInteraction(getContentPartnersInteraction());
        const response = await client.contentPartners.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingContentPartnerFromStaging);
        expect(response[0].name).toEqual('a name');
        expect(response[0].official).toEqual(true);
        expect(response[0].links.self.getOriginalLink()).toContain(
          `/v1/content-partners/${existingContentPartnerFromStaging}`,
        );
      });

      it('can fetch signed link', async () => {
        const filename = 'file.png';
        await provider.addInteraction(getSignedLink(filename));

        const signedLink = await client.contentPartners.getSignedLink(filename);

        expect(typeof signedLink).toEqual('string');
      });

      it('can fetch a content partner', async () => {
        await provider.addInteraction(
          getContentPartnerInteraction(existingContentPartnerFromStaging),
        );
        const contentPartner = await client.contentPartners.get(
          existingContentPartnerFromStaging,
        );

        expect(contentPartner.id).toEqual(existingContentPartnerFromStaging);
        expect(contentPartner.name).toEqual('a name');
        expect(contentPartner.official).toEqual(true);
        expect(contentPartner.currency).toEqual('USD');
        expect(contentPartner.legalRestriction?.id).toEqual('2');
        expect(contentPartner.legalRestriction?.text).toEqual(
          'a legal restriction',
        );
        expect(contentPartner.distributionMethods).toEqual(['STREAM']);
        expect(contentPartner.description).toEqual('this is a description');
        expect(contentPartner.awards).toEqual('Big famous award');
        expect(contentPartner.notes).toEqual('Something noteworthy');
        expect(contentPartner.hubspotId).toEqual('666');
        expect(contentPartner.contentCategories?.[0].key).toEqual('ANY_KEY');
        expect(contentPartner.contentCategories?.[0].label).toEqual(
          'Any label',
        );
        expect(contentPartner.language?.code).toEqual('spa');
        expect(contentPartner.language?.name).toEqual('Spanish');
        expect(contentPartner.contentTypes).toHaveLength(2);
        expect(contentPartner.contentTypes).toContain('NEWS');
        expect(contentPartner.contentTypes).toContain('STOCK');
        expect(contentPartner.pedagogyInformation?.curriculumAligned).toContain(
          '123',
        );
        expect(
          contentPartner.pedagogyInformation?.educationalResources,
        ).toContain('456');
        expect(
          contentPartner.pedagogyInformation?.isTranscriptProvided,
        ).toEqual(true);
        expect(contentPartner.pedagogyInformation?.subjects).toEqual([
          '5cb499c9fd5beb428189454b',
          '5cb499c9fd5beb428189454d',
          '5cb499c9fd5beb428189454e',
        ]);
        expect(contentPartner.pedagogyInformation?.bestForTags).toEqual([
          '5d3ac0175b3f3b7ba335e104',
          '5d3ac0185b3f3b7ba335e106',
          '5d3ac0185b3f3b7ba335e105',
        ]);
        expect(contentPartner.pedagogyInformation?.ageRanges.min).toEqual(10);
        expect(contentPartner.pedagogyInformation?.ageRanges.max).toEqual(20);
        expect(contentPartner.pedagogyInformation?.ageRanges.label).toEqual(
          '10-20',
        );
        expect(contentPartner.pedagogyInformation?.ageRanges.ids).toEqual([
          '123',
        ]);

        expect(contentPartner.oneLineDescription).toEqual(
          '30-year-old mulberry field',
        );
        expect(contentPartner.marketingInformation?.status).toEqual(
          'IN_PROGRESS',
        );
        expect(contentPartner.marketingInformation?.logos).toEqual([
          'logo1.png',
          'logo2.png',
        ]);
        expect(contentPartner.marketingInformation?.showreel).toEqual(
          'showreel.mkv',
        );
        expect(contentPartner.marketingInformation?.sampleVideos).toEqual([
          'sample1.avi',
          'sample2.avi',
        ]);
        expect(contentPartner.ingest?.type).toEqual('MANUAL');
        expect(contentPartner.ingest?.urls).toBeUndefined();
      });

      it('can update a content partner', async () => {
        await provider.addInteraction(
          updateContentPartner(existingContentPartnerFromStaging),
        );
        await client.contentPartners.update(existingContentPartnerFromStaging, {
          name: 'TED',
          ageRanges: ['early-years'],
          ingest: {
            type: 'MRSS',
            urls: ['https://mrss.feed'],
          },
          deliveryFrequency: moment.duration(3, 'month'),
        });
      });

      it('can get content partner categories', async () => {
        await provider.addInteraction(getContentCategories());

        const contentCategories = await client.contentPartners.getContentCategories();

        expect(contentCategories.categories[0].key).toContain('key 1');
        expect(contentCategories.categories[0].label).toContain('label 1');
      });

      it('gives a useful error message on a 404', async () => {
        await provider.addInteraction(get404ContentPartner('404'));

        let error: BoclipsApiError | null = null;
        try {
          await client.contentPartners.get('404');
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
