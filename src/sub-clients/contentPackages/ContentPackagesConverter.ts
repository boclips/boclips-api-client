import { ContentPackage } from './model/ContentPackage';

export class ContentPackagesConverter {
  public static convert(response: any): ContentPackage[] {
    return response.data._embedded.contentPackages.map((data: any) => ({
      id: data.id,
      name: data.name,
    }));
  }
}
