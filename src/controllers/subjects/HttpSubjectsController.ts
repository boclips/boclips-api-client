import { AxiosInstance } from 'axios';
import { SubjectsConverter } from '../../converters/SubjectsConverter';
import { BackofficeLinks } from '../../types';
import { Subject } from '../../types/Subject';
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
}
