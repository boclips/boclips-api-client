import { ContentPackage } from '../model/ContentPackage';

export interface ContentPackagesClient {
  getAll(): Promise<ContentPackage[]>;
}
