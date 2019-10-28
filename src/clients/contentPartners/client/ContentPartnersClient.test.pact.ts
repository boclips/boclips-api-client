import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { FakeBoclipsClient } from '../../../FakeBoclipsClient';
import { ContentPartnerEntityFactory } from '../../../test-support/ContentPartnersFactory';
import { provider } from '../../../test-support/pactSetup';
import {
  isATestClient,
  withClients,
} from '../../../test-support/pactTestWrapper';
import {
  existingContentPartnerFromStaging,
  getContentPartnerInteraction,
  getContentPartnersInteraction,
  updateContentPartner,
} from '../pact/ContentPartnersInteractions';

describe('ContentPartnersClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          (client as FakeBoclipsClient).contentPartnersClient.insertContentPartnerFixture(
            ContentPartnerEntityFactory.sample({
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
        expect(response[0]._links.self.href).toContain(
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
          ContentPartnerEntityFactory.sample({
            id: existingContentPartnerFromStaging,
            _links: {
              self: {
                href: `${provider.mockService.baseUrl}/v1/content-partners/${existingContentPartnerFromStaging}`,
              },
            },
          }),
        );
      });
    },
  );
});
