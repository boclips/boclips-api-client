import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ContentPartnersClient } from './sub-clients/contentPartners/client/ContentPartnersClient';
import { HttpFeedsClient } from './sub-clients/httpFeeds/client/HttpFeedsClient';
import { LegalRestrictionsClient } from './sub-clients/legalRestrictions/client/LegalRestrictionsClient';
import { SubjectsClient } from './sub-clients/subjects/client/SubjectsClient';

export interface BoclipsClient {
  legalRestrictionsClient: LegalRestrictionsClient;
  contentPartnersClient: ContentPartnersClient;
  subjectsClient: SubjectsClient;
  feedsClient: HttpFeedsClient;
  collectionsClient: CollectionsClient;
}
