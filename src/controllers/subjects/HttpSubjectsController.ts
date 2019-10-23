import { SubjectsConverter } from '../../converters/SubjectsConverter';
import { Subject } from '../../types';
import { HttpController } from '../HttpController';
import { SubjectsController } from './SubjectsController';

export class HttpSubjectsController extends HttpController
  implements SubjectsController {
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
