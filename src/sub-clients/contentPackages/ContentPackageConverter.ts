import { ContentPackage } from './model/ContentPackage';

export class ContentPackageConverter {
  public static convertPackages(response: any): ContentPackage[] {
    return response.data._embedded.contentPackages.map(this.convertPackage);
  }

  public static convertPackage(data: any): ContentPackage {
    return {
      id: data.id,
      name: data.name,
      accessRules: []
    }
  }
}
