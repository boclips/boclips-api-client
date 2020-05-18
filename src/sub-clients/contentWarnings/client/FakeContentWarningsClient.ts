import { ContentWarningsClient } from './ContentWarningsClient';
import { ContentWarning } from '../model/ContentWarning';
import { Clearable } from '../../common/utils/Clearable';

export class FakeContentWarningsClient
  implements ContentWarningsClient, Clearable {
  private contentWarnings: ContentWarning[] = [];

  getAll(): Promise<ContentWarning[]> {
    return Promise.resolve(this.contentWarnings);
  }

  insert(contentWarning: ContentWarning) {
    this.contentWarnings.push(contentWarning);
  }

  clear(): void {
    this.contentWarnings = [];
  }
}
