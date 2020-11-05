import { ApiSubClient } from '../../common/client/ApiSubClient';
import { Subject, UpdateSubjectRequest } from '../model/Subject';
import { SubjectsConverter } from '../SubjectsConverter';
import { SubjectsClient } from './SubjectsClient';

export class ApiSubjectsClient extends ApiSubClient implements SubjectsClient {
  public async getAll(): Promise<Subject[]> {
    const subjectsLink = this.getLinkOrThrow('subjects');

    return this.axios
      .get(subjectsLink.href)
      .then((response) =>
        response.data._embedded.subjects.map((it: any) =>
          SubjectsConverter.convert(it),
        ),
      );
  }

  public async update(
    subject: Subject,
    updateRequest: UpdateSubjectRequest,
  ): Promise<void> {
    const validUpdateLink = subject?.links?.update;
    if (!validUpdateLink) {
      throw new Error('Update link not available');
    }

    await this.axios.put(
      subject.links!.update!.getOriginalLink(),
      updateRequest,
    );
  }
}
