import { LinkEntity } from '../../common/model/LinkEntity';

export interface AdminLinks {
  collection: LinkEntity;
  createCollection: LinkEntity;
  adminCollectionSearch: LinkEntity;
  jobs: LinkEntity;
  jobDetails: LinkEntity;
  adminSearch: LinkEntity;
  orders: LinkEntity;
  exportOrders: LinkEntity;
  order: LinkEntity;
  httpFeeds: LinkEntity;
  contentPartners: LinkEntity;
  contentPartner: LinkEntity;
  contentPartnersSignedUploadLink: LinkEntity;
  legalRestrictions: LinkEntity;
  youtubeFeeds: LinkEntity;
  createHttpFeed: LinkEntity;
  distributionMethods: LinkEntity;
  trackPageRendered: LinkEntity;
  subjects: LinkEntity;
  searchAccessRules: LinkEntity;
  reportAccessExpired: LinkEntity;
  independentAccounts: LinkEntity;
  videoTypes: LinkEntity;
  contentCategories: LinkEntity;
  ingestVideos: LinkEntity;
  tags: LinkEntity;
  marketingStatuses: LinkEntity;
  ageRanges: LinkEntity;
  ingestVideoStatuses: LinkEntity;
}
