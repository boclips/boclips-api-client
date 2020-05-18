import { ContentWarning } from '../model/ContentWarning';

export interface ContentWarningsClient {
  getAll(): Promise<ContentWarning[]>;
}
