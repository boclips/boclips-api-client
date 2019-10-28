import { CollectionsClient } from './clients/collections/client/CollectionsClient';
import { ContentPartnersClient } from './clients/contentPartners/client/ContentPartnersClient';
import { HttpFeedsClient } from './clients/httpFeeds/client/HttpFeedsClient';
import { LegalRestrictionsClient } from './clients/legalRestrictions/client/LegalRestrictionsClient';
import { SubjectsClient } from './clients/subjects/client/SubjectsClient';

export interface BoclipsClient {
  legalRestrictionsClient: LegalRestrictionsClient;
  contentPartnersClient: ContentPartnersClient;
  subjectsClient: SubjectsClient;
  feedsClient: HttpFeedsClient;
  collectionsClient: CollectionsClient;
}
