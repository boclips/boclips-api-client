import { VideoTypesClient } from './sub-clients/videoTypes/client/VideoTypesClient';
import { AccountsClient } from './sub-clients/accounts/client/AccountsClient';
import { CollectionsClient } from './sub-clients/collections/client/CollectionsClient';
import { ContentPartnersClient } from './sub-clients/contentPartners/client/ContentPartnersClient';
import { EventsClient } from './sub-clients/events/client/EventsClient';
import { HttpFeedsClient } from './sub-clients/httpFeeds/client/HttpFeedsClient';
import { JobsClient } from './sub-clients/jobs/client/JobsClient';
import { LegalRestrictionsClient } from './sub-clients/legalRestrictions/client/LegalRestrictionsClient';
import { OrdersClient } from './sub-clients/orders/client/OrdersClient';
import { SubjectsClient } from './sub-clients/subjects/client/SubjectsClient';

export interface BoclipsClient {
  legalRestrictionsClient: LegalRestrictionsClient;
  contentPartnersClient: ContentPartnersClient;
  subjectsClient: SubjectsClient;
  feedsClient: HttpFeedsClient;
  collectionsClient: CollectionsClient;
  ordersClient: OrdersClient;
  eventsClient: EventsClient;
  jobsClient: JobsClient;
  accountsClient: AccountsClient;
  videoTypesClient: VideoTypesClient;
}
