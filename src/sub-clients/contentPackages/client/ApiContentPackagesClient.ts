import { ContentPackage } from '../model/ContentPackage';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import { ContentPackagesClient } from './ContentPackagesClient';
import { ContentPackageConverter } from '../ContentPackageConverter';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';

export class ApiContentPackagesClient extends ApiSubClient
  implements ContentPackagesClient {
  getAll(): Promise<ContentPackage[]> {
    const contentPackagesLink = this.getLinkOrThrow('getContentPackages');

    return this.axios
      .get(contentPackagesLink.href)
      .then(it => ContentPackageConverter.convertPackages(it));
  }

  get(id: string): Promise<ContentPackage> {
    const contentPackageLink = this.getLinkOrThrow('getContentPackage');

    return this.axios
      .get(expandUrlTemplate(contentPackageLink.href, { id }))
      .then(it => ContentPackageConverter.convertPackage(it.data));
  }

  replace(
    id: string,
    newContentPackage: ContentPackage,
  ): Promise<ContentPackage> {
    const updateContentPackageLink = this.getLinkOrThrow(
      'updateContentPackage',
    );
    return this.axios
      .put(
        expandUrlTemplate(updateContentPackageLink.href, { id }),
        newContentPackage,
      )
      .then(it => ContentPackageConverter.convertPackage(it.data));
  }
}
