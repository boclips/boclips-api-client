import { ApiClient } from '../../common/client/ApiClient';
import { Subject } from '../model/Subject';
import { SubjectsConverter } from '../SubjectsConverter';
import { SubjectsClient } from './SubjectsClient';

export class ApiSubjectsClient extends ApiClient implements SubjectsClient {
  public async getAll(): Promise<Subject[]> {
    const subjectsLink = this.getLinkOrThrow('subjects');

    return this.axios
      .get(subjectsLink.href)
      .then(response =>
        response.data._embedded.subjects.map(it =>
          SubjectsConverter.convert(it),
        ),
      );
  }

  public async update(currentSubject: Subject, newName: string): Promise<void> {
    const validUpdateLink = currentSubject && currentSubject.updateLink;
    if (!validUpdateLink) {
      throw new Error('Update link not available');
    }

    await this.axios.put(currentSubject.updateLink, { name: newName });
  }
}
