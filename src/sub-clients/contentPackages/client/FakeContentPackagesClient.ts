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
  get(id: string): Promise<ContentPackage> {
    const contentPackage = this.contentPackages.find(it => it.id === id);
    if (contentPackage) {
      return Promise.resolve(contentPackage);
    } else {
      return Promise.reject(`Package with id ${id} not found`);
    }
  }

  replace(id: string, newContentPackage: ContentPackage): Promise<ContentPackage> {
    const contentPackage = this.contentPackages.find(it => it.id === id);
    if (contentPackage) {
      newContentPackage['id'] = id;
      this.contentPackages[this.contentPackages.indexOf(contentPackage)] = newContentPackage;
      return Promise.resolve(newContentPackage);
    } else {
      return Promise.reject(`Package with id ${id} not found`);
    }
  }
}
