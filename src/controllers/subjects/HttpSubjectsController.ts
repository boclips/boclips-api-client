import { AxiosInstance } from 'axios';
import { SubjectsConverter } from '../../converters/SubjectsConverter';
import { BackofficeLinks } from '../../types';
import { Subject } from '../../types';
import { SubjectsController } from './SubjectsController';

export class HttpSubjectsController implements SubjectsController {
  public constructor(
    private backofficeLinks: BackofficeLinks,
    private axios: AxiosInstance,
  ) {}

  public async getAll(): Promise<Subject[]> {
    if (this.backofficeLinks && this.backofficeLinks.subjects) {
      const response = await this.axios.get(this.backofficeLinks.subjects.href);
      return response.data._embedded.subjects.map(it =>
        SubjectsConverter.convert(it),
      );
    } else {
      throw new Error('Not authorized for method');
    }
  }

  public async update(currentSubject: Subject, newName: string): Promise<void> {
    if (currentSubject && currentSubject.updateLink) {
      await this.axios.put(currentSubject.updateLink, { name: newName });
    } else {
      throw new Error('Update link not available');
    }
  }
}
