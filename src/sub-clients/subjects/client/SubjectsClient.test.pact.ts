import { ApiBoclipsClient } from '../../../ApiBoclipsClient';
import { provider } from '../../../pact-support/pactSetup';
import { withClients } from '../../../pact-support/pactTestWrapper';
import { FakeBoclipsClient, isATestClient } from '../../../test-support';
import { SubjectFactory } from '../../../test-support/SubjectsFactory';
import { Link } from '../../common/model/LinkEntity';
import { Subject } from '../model/Subject';
import {
  existingSubjectIdFromStaging,
  getSubjects,
  updateSubject,
} from '../pact/SubjectsInteractions';

describe('SubjectsClient', () => {
  withClients(
    (getClient: () => Promise<FakeBoclipsClient | ApiBoclipsClient>) => {
      let client: FakeBoclipsClient | ApiBoclipsClient;

      beforeEach(async () => {
        client = await getClient();

        if (isATestClient(client)) {
          client.subjects.insertSubject({
            id: existingSubjectIdFromStaging,
            name: 'Subject Sample',
            links: {
              update: new Link({
                href: `/v1/subjects/${existingSubjectIdFromStaging}`,
              }),
            },
          });
        }
      });

      it(`can fetch all subjects `, async () => {
        await provider.addInteraction(getSubjects());

        const response: Subject[] = await client.subjects.getAll();

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(existingSubjectIdFromStaging);
        expect(response[0].name).toEqual('Subject Sample');
        expect(response[0].links?.update?.getOriginalLink()).toMatch(
          new RegExp(`.*/v1/subjects/${existingSubjectIdFromStaging}$`),
        );
      });

      it('can update subjects', async () => {
        await provider.addInteraction(
          updateSubject(existingSubjectIdFromStaging, 'Design'),
        );

        await client.subjects.update(
          SubjectFactory.sample({
            id: existingSubjectIdFromStaging,
            links: {
              update: new Link({
                href: `${provider.mockService.baseUrl}/v1/subjects/${existingSubjectIdFromStaging}`,
              }),
            },
          }),
          { name: 'Design' },
        );
      });

      it('cannot update subject without an updateLink', async () => {
        const updateCall = async () =>
          await client.subjects.update(
            SubjectFactory.sample({ id: existingSubjectIdFromStaging }),
            { name: 'Design' },
          );

        await expect(updateCall()).rejects.toThrow(Error);
      });
    },
  );
});
