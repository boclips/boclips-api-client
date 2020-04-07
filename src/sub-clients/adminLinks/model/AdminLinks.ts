import { LinkEntity } from '../../common/model/LinkEntity';

export interface AdminLinks {
  collection: LinkEntity;
  video: LinkEntity;
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
  contentPartnerContract: LinkEntity;
  createContentPartnerContracts: LinkEntity;
  createContentPartnerContractsSignedUploadLink: LinkEntity;
  contentPartnerContracts: LinkEntity;
  legalRestrictions: LinkEntity;
  youtubeFeeds: LinkEntity;
  createHttpFeed: LinkEntity;
  distributionMethods: LinkEntity;
  trackPageRendered: LinkEntity;
  subjects: LinkEntity;
  searchAccessRules: LinkEntity;
  reportAccessExpired: LinkEntity;
  organisations: LinkEntity;
  videoTypes: LinkEntity;
  contentCategories: LinkEntity;
  ingestVideos: LinkEntity;
  tags: LinkEntity;
  marketingStatuses: LinkEntity;
  ageRanges: LinkEntity;
  ingestVideoStatuses: LinkEntity;
  contractLegalRestrictions: LinkEntity;
}
