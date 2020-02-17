import { IngestVideosFactory } from '../../../test-support';
import {
  getFilteredIngestVideosInteraction,
  getIngestVideosInteraction,
} from '../pact/IngestVideosInteraction';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { isATestClient, FakeBoclipsClient } from '../../../test-support';
import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';

export const ingestVideoFixture = IngestVideosFactory.sample();
describe('IngestVideosClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          const fakeClient = client as FakeBoclipsClient;
          fakeClient.ingestVidoesClient.insertIngestVideoFixture(
            ingestVideoFixture,
          );
        }
      });

      it('can fetch all jobs', async () => {
        await provider.addInteraction(getIngestVideosInteraction());
        const ingestVideos = await client.ingestVidoesClient.getAll({
          page: 1,
          size: 2,
        });
        const pageSpec = ingestVideos.pageSpec;
        const firstVideo = ingestVideos.page[0];
        expect(pageSpec.size).toEqual(2);
        expect(pageSpec.number).toEqual(1);
        expect(pageSpec.nextPage.getOriginalLink()).toBeDefined();
        expect(pageSpec.previousPage.getOriginalLink()).toBeDefined();

        expect(firstVideo.id).toEqual(ingestVideoFixture.id);
        expect(firstVideo.title).toEqual(ingestVideoFixture.title);
        expect(firstVideo.contentPartner.id).toEqual(
          ingestVideoFixture.contentPartner.id,
        );
        expect(firstVideo.contentPartner.name).toEqual(
          ingestVideoFixture.contentPartner.name,
        );
        expect(firstVideo.ingestJob.id).toEqual(
          ingestVideoFixture.ingestJob.id,
        );
        expect(firstVideo.ingestStartedAt).toEqual(
          ingestVideoFixture.ingestStartedAt,
        );
        expect(firstVideo.status).toEqual(ingestVideoFixture.status);
      });

      it('can filter videos by content partner name', async () => {
        if (isATestClient(client)) {
          const fakeClient = client as FakeBoclipsClient;
          fakeClient.ingestVidoesClient.insertIngestVideoFixture(
            IngestVideosFactory.sample({
              contentPartner: { id: '1', name: 'AP' },
            }),
          );
          fakeClient.ingestVidoesClient.insertIngestVideoFixture(
            IngestVideosFactory.sample({
              contentPartner: { id: '2', name: 'AP' },
            }),
          );
        }

        const filter = { contentPartnerName: 'AP' };

        await provider.addInteraction(
          getFilteredIngestVideosInteraction(filter),
        );

        const filteredIngestVideos = await client.ingestVidoesClient.getAll(
          {
            page: 1,
            size: 2,
          },
          filter,
        );

        filteredIngestVideos.page.forEach(it =>
          expect(it.contentPartner.name).toBe('AP'),
        );
      });
    },
  );
});
