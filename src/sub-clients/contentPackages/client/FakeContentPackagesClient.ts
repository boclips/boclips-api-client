import { ContentPackagesClient } from './ContentPackagesClient';
import { ContentPackage } from '../model/ContentPackage';
import { Clearable } from '../../common/utils/Clearable';

export class FakeContentPackagesClient
  implements ContentPackagesClient, Clearable {
  private contentPackages: ContentPackage[] = [];
  getAll(): Promise<ContentPackage[]> {
    return Promise.resolve(this.contentPackages);
  }
  insert(contentPackage: ContentPackage) {
    this.contentPackages.push(contentPackage);
  }
  clear(): void {
    this.contentPackages = [];
  }
}
