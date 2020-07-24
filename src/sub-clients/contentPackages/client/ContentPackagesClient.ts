import { ContentPackage } from '../model/ContentPackage';

export interface ContentPackagesClient {
  getAll(): Promise<ContentPackage[]>;
  get(id: string): Promise<ContentPackage>;
  replace(
    id: string,
    newContentPackage: ContentPackage,
  ): Promise<ContentPackage>;
}
