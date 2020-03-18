import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { OrganisationFactory } from '../../../test-support/OrganisationFactory';
import { UpdateOrganisationRequest } from '../model/UpdateOrganisationRequest';
import {
  associateUsers,
  getOrganisationsByCountryCode,
  updateOrganisation,
} from '../pact/OrganisationInteractions';

const USA_ORGANISATION_ID_FROM_STAGING = '5de5369d1617b3000142c08f';

describe('Organisation', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.organisationsClient.insertOrganisationFixture(
            OrganisationFactory.sample({
              id: USA_ORGANISATION_ID_FROM_STAGING,
            }),
          );
        }
      });

      it('can fetch all accounts from USA', async () => {
        await provider.addInteraction(
          getOrganisationsByCountryCode(
            USA_ORGANISATION_ID_FROM_STAGING,
            'USA',
          ),
        );
        const organisationsPage = await client.organisationsClient.getOrganisations(
          {
            countryCode: 'USA',
            page: 0,
            size: 30,
          },
        );

        expect(organisationsPage.page.length).toBeGreaterThanOrEqual(1);
        expect(
          organisationsPage.page.some(
            account => account.id === USA_ORGANISATION_ID_FROM_STAGING,
          ),
        ).toBeTruthy();
      });

      it('can fetch all accounts', async () => {
        await provider.addInteraction(
          getOrganisationsByCountryCode(
            USA_ORGANISATION_ID_FROM_STAGING,
            'USA',
          ),
        );
        const organisationsPage = await client.organisationsClient.getOrganisations(
          {
            countryCode: 'USA',
            page: 0,
            size: 30,
          },
        );

        expect(organisationsPage.page.length).toBeGreaterThanOrEqual(1);
        expect(
          organisationsPage.page.some(
            account => account.id === USA_ORGANISATION_ID_FROM_STAGING,
          ),
        ).toBeTruthy();
      });

      it(`can edit an account's access expiry date`, async () => {
        const updatedTime = '2020-12-21T00:00:00.000';
        const updateRequest: UpdateOrganisationRequest = {
          accessExpiresOn: new Date(updatedTime),
        };
        await provider.addInteraction(
          getOrganisationsByCountryCode(
            USA_ORGANISATION_ID_FROM_STAGING,
            'USA',
          ),
        );
        await provider.addInteraction(
          updateOrganisation(USA_ORGANISATION_ID_FROM_STAGING, updateRequest),
        );
        const organisationPage = await client.organisationsClient.getOrganisations(
          {
            countryCode: 'USA',
            page: 0,
            size: 30,
          },
        );

        const updatedOrganisation = await client.organisationsClient.updateOrganisation(
          organisationPage.page[0],
          updateRequest,
        );

        expect(updatedOrganisation.accessExpiresOn).toEqual(
          new Date(updatedTime),
        );
      });

      it(`can associate users to organisations`, async () => {
        await provider.addInteraction(
          getOrganisationsByCountryCode(
            USA_ORGANISATION_ID_FROM_STAGING,
            'USA',
          ),
        );
        const organisationPage = await client.organisationsClient.getOrganisations(
          {
            countryCode: 'USA',
            page: 0,
            size: 30,
          },
        );

        await provider.addInteraction(
          associateUsers(USA_ORGANISATION_ID_FROM_STAGING),
        );
        const associatedUsers = await client.organisationsClient.associateUsers(
          organisationPage.page[0],
        );

        expect(associatedUsers.length).toEqual(0);
      });
    },
  );
});
