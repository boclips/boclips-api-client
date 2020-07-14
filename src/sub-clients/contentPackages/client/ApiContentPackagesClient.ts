import { ContentPackage } from '../model/ContentPackage';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { ContentPackagesClient } from './ContentPackagesClient';
import { ContentPackagesConverter } from '../ContentPackagesConverter';

export class ApiContentPackagesClient extends ApiSubClient
  implements ContentPackagesClient {
  getAll(): Promise<ContentPackage[]> {
    const contentPackages = this.getLinkOrThrow('contentPackages');

    return this.axios
      .get(contentPackages.href)
      .then(it => ContentPackagesConverter.convert(it));
  }
}
