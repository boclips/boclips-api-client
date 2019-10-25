import { HttpBoclipsApiClient } from './HttpBoclipsApiClient';
import {
  existingRestrictionFromStaging,
  getContentPartnerInteraction,
  getContentPartnersInteraction,
  updateContentPartner,
} from './test-support/interactions/contentPartnersInteractions';
import { provider } from './test-support/pactSetup';
import { isATestClient, withClients } from './test-support/pactTestWrapper';
import { TestBoclipsApiClient } from './TestBoclipsApiClient';
import { ContentPartnerFactory } from './types';

describe('ContentPartnersController', () => {
  withClients(
    (getClient: () => Promise<TestBoclipsApiClient | HttpBoclipsApiClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          (client as TestBoclipsApiClient).contentPartnersController.insertContentPartnerFixture(
            ContentPartnerFactory.sample({
              id: existingRestrictionFromStaging,
              name: 'a name',
              official: true,
            }),
          );
        }
      });

      it('can fetch all content partners', async () => {
        await provider.addInteraction(getContentPartnersInteraction());
        const response = await client.contentPartnersController.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingRestrictionFromStaging);
        expect(response[0].name).toEqual('a name');
        expect(response[0].official).toEqual(true);
        expect(response[0]._links.self.href).toContain(
          `/v1/content-partners/${existingRestrictionFromStaging}`,
        );
      });

      it('can fetch a content partner', async () => {
        await provider.addInteraction(
          getContentPartnerInteraction(existingRestrictionFromStaging),
        );
        const contentPartner = await client.contentPartnersController.get(
          existingRestrictionFromStaging,
        );

        expect(contentPartner.id).toEqual(existingRestrictionFromStaging);
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
          updateContentPartner(existingRestrictionFromStaging),
        );
        await client.contentPartnersController.update(
          ContentPartnerFactory.sample({
            id: existingRestrictionFromStaging,
            _links: {
              self: {
                href: `${provider.mockService.baseUrl}/v1/content-partners/${existingRestrictionFromStaging}`,
              },
            },
          }),
        );
      });
    },
  );
});
