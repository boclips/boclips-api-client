import { ApiSubClient } from '../../common/client/ApiSubClient';
import { VideoTypesClient } from './VideoTypesClient';
import { VideoTypesConverter } from '../VideoTypesConverter';

export class ApiVideoTypesClient
  extends ApiSubClient
  implements VideoTypesClient {
  public getAll() {
    const videoTypesLink = this.getLinkOrThrow('videoTypes');

    return this.axios
      .get(videoTypesLink.href)
      .then((response) => VideoTypesConverter.convert(response.data));
  }
}
