import { ContentPackage } from './model/ContentPackage';

export class ContentPackageConverter {
  public static convertPackages(response: any): ContentPackage[] {
    return response.data._embedded.contentPackages.map(this.convertPackage);
  }

  public static convertPackage(data: any): ContentPackage {
    return {
      id: data.id,
      name: data.name,
      accessRules: data.accessRules.map((accessRule: any) => ({
        type: accessRule.type,
        videoIds: accessRule.videoIds || undefined,
        collectionIds: accessRule.collectionIds || undefined,
        channelIds: accessRule.channelIds || undefined,
        videoTypes: accessRule.videoTypes || undefined,
        distributionMethods: accessRule.distributionMethods || undefined,
      }))
    }
  }

  // public static convertAccessRules(accessRules: any[]): AccessRule[] {
  //   return
  // }
}
