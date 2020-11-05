import { ContentWarningsClient } from './ContentWarningsClient';
import { ContentWarning } from '../model/ContentWarning';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { ContentWarningsConverter } from '../ContentWarningsConverter';

export class ApiContentWarningsClient
  extends ApiSubClient
  implements ContentWarningsClient {
  getAll(): Promise<ContentWarning[]> {
    const contentWarnings = this.getLinkOrThrow('contentWarnings');

    return this.axios
      .get(contentWarnings.href)
      .then((it) => ContentWarningsConverter.convert(it));
  }
}
