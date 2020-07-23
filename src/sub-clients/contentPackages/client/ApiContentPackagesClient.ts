import { ContentPackage } from '../model/ContentPackage';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { ContentPackagesClient } from './ContentPackagesClient';
import { ContentPackageConverter } from '../ContentPackageConverter';
import expandUrlTemplate from "../../common/utils/expandUrlTemplate";

export class ApiContentPackagesClient extends ApiSubClient
  implements ContentPackagesClient {
  getAll(): Promise<ContentPackage[]> {
    const contentPackages = this.getLinkOrThrow('contentPackages');

    return this.axios
      .get(contentPackages.href)
      .then(it => ContentPackageConverter.convertPackages(it));
  }

  get(id: string): Promise<ContentPackage> {
    const contentPackages = this.getLinkOrThrow('contentPackage');

    return this.axios
        .get(expandUrlTemplate(contentPackages.href, { id }))
        .then(ContentPackageConverter.convertPackage);
  }
}
