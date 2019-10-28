import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import {
  existingSubjectFromStaging,
  getSubjects,
  updateSubject,
} from '../pact/SubjectsInteractions';
import { provider } from '../../../test-support/pactSetup';
import {
  isATestClient,
  withClients,
} from '../../../test-support/pactTestWrapper';
import { FakeBoclipsClient } from '../../../FakeBoclipsClient';

describe('SubjectsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          (client as FakeBoclipsClient).subjectsClient.insertSubject({
            id: existingSubjectFromStaging,
            name: 'Subject Sample',
            updateLink: `/v1/subjects/${existingSubjectFromStaging}`,
          });
        }
      });

      it(`can fetch all subjects `, async () => {
        await provider.addInteraction(getSubjects());

        const response = await client.subjectsClient.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingSubjectFromStaging);
        expect(response[0].name).toEqual('Subject Sample');
        expect(response[0].updateLink).toMatch(
          new RegExp(`.*/v1/subjects/${existingSubjectFromStaging}$`),
        );
      });

      it('can update subjects', async () => {
        await provider.addInteraction(
          updateSubject(existingSubjectFromStaging),
        );

        await client.subjectsClient.update(
          {
            id: existingSubjectFromStaging,
            name: 'Old name',
            updateLink: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectFromStaging}`,
          },
          'Design',
        );
      });

      it('cannot update subject without an updateLink', async () => {
        const updateCall = async () =>
          await client.subjectsClient.update(
            {
              id: existingSubjectFromStaging,
              name: 'Old Design',
            },
            'Design',
          );

        await expect(updateCall()).rejects.toThrow(Error);
      });
    },
  );
});
