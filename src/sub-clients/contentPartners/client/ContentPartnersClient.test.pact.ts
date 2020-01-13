import { createContentPartner } from './../pact/ContentPartnersInteractions';
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
  getContentPartnerInteraction,
  getContentPartnersInteraction,
  updateContentPartner,
} from '../pact/ContentPartnersInteractions';

describe('ContentPartnersClient', () => {
  const date = Date.now();
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.contentPartnersClient.insertContentPartnerFixture(
            ContentPartnerFactory.sample({
              id: existingContentPartnerFromStaging,
              name: 'a name',
              official: true,
            }),
          );
        }
      });

      it('can fetch all content partners', async () => {
        await provider.addInteraction(getContentPartnersInteraction());
        const response = await client.contentPartnersClient.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingContentPartnerFromStaging);
        expect(response[0].name).toEqual('a name');
        expect(response[0].official).toEqual(true);
        expect(response[0].links.self.getOriginalLink()).toContain(
          `/v1/content-partners/${existingContentPartnerFromStaging}`,
        );
      });

      it('can fetch a content partner', async () => {
        await provider.addInteraction(
          getContentPartnerInteraction(existingContentPartnerFromStaging),
        );
        const contentPartner = await client.contentPartnersClient.get(
          existingContentPartnerFromStaging,
        );

        expect(contentPartner.id).toEqual(existingContentPartnerFromStaging);
        expect(contentPartner.name).toEqual('a name');
        expect(contentPartner.official).toEqual(true);
        expect(contentPartner.currency).toEqual('USD');
        expect(contentPartner.ageRange.min).toEqual(10);
        expect(contentPartner.ageRange.max).toEqual(20);
        expect(contentPartner.ageRange.label).toEqual('10-20');
        expect(contentPartner.legalRestrictions.id).toEqual('2');
        expect(contentPartner.legalRestrictions.text).toEqual(
          'a legal restriction',
        );
        expect(contentPartner.distributionMethods).toEqual(['STREAM']);
      });

      it('can update a content partner', async () => {
        await provider.addInteraction(
          updateContentPartner(existingContentPartnerFromStaging),
        );
        await client.contentPartnersClient.update(
          existingContentPartnerFromStaging,
          {
            name: 'TED',
            ageRange: { min: 3, max: 12 },
          },
        );
      });

      it('can create a content partner', async () => {
        const request = ContentPartnerFactory.createRequest({
          name: `CP-${date}`,
        });

        await provider.addInteraction(createContentPartner(request));

        await expect(
          client.contentPartnersClient.create(request),
        ).resolves.not.toThrow();
      });
    },
  );
});
