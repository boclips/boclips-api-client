export interface ContentPackage {
  id?: string;
  name: string;
  accessRules: AccessRule[];
}

export interface AccessRule {
  type: AccessRuleType;
  videoIds?: string[];
  collectionIds?: string[];
  channelIds?: string[];
  distributionMethods?: string[];
  videoTypes?: string[];
}

export type AccessRuleType =
  | 'ExcludedVideos'
  | 'IncludedVideos'
  | 'IncludedCollections'
  | 'IncludedChannels'
  | 'IncludedDistributionMethods'
  | 'ExcludedChannels'
  | 'ExcludedVideoTypes';
