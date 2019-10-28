import { ApiClient } from '../../common/client/ApiClient';
import { Subject } from '../model/Subject';
import { SubjectsConverter } from '../SubjectsConverter';
import { SubjectsClient } from './SubjectsClient';

export class ApiSubjectsClient extends ApiClient implements SubjectsClient {
  public async getAll(): Promise<Subject[]> {
    return this.requestWithAdminLink('subjects', async () => {
      const response = await this.axios.get(this.adminLinks.subjects.href);

      return response.data._embedded.subjects.map(it =>
        SubjectsConverter.convert(it),
      );
    });
  }

  public async update(currentSubject: Subject, newName: string): Promise<void> {
    if (currentSubject && currentSubject.updateLink) {
      await this.axios.put(currentSubject.updateLink, { name: newName });
    } else {
      throw new Error('Update link not available');
    }
  }
}
