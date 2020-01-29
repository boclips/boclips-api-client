import { FakeIngestVideosClient } from './../sub-clients/ingestVideos/client/FakeIngestVideosClient';
import { FakeVideoTypesClient } from '../sub-clients/videoTypes/client/FakeVideoTypesClient';
import { BoclipsClient } from '../BoclipsClient';
import { FakeAccountsClient } from '../sub-clients/accounts/client/FakeAccountClient';
import { FakeCollectionsClient } from '../sub-clients/collections/client/FakeCollectionsClient';
import { Clearable } from '../sub-clients/common/utils/Clearable';
import { FakeContentPartnersClient } from '../sub-clients/contentPartners/client/FakeContentPartnersClient';
import { FakeEventsClient } from '../sub-clients/events/client/FakeEventsClient';
import { FakeHttpFeedsClient } from '../sub-clients/httpFeeds/client/FakeHttpFeedsClient';
import { FakeJobsClient } from '../sub-clients/jobs/client/FakeJobsClient';
import { FakeLegalRestrictionsClient } from '../sub-clients/legalRestrictions/client/FakeLegalRestrictionsClient';
import { FakeOrdersClient } from '../sub-clients/orders/client/FakeOrdersClient';
import { FakeSubjectsClient } from '../sub-clients/subjects/client/FakeSubjectsClient';

export class FakeBoclipsClient implements BoclipsClient, Clearable {
  public legalRestrictionsClient: FakeLegalRestrictionsClient = new FakeLegalRestrictionsClient();
  public contentPartnersClient: FakeContentPartnersClient = new FakeContentPartnersClient();
  public subjectsClient: FakeSubjectsClient = new FakeSubjectsClient();
  public feedsClient: FakeHttpFeedsClient = new FakeHttpFeedsClient();
  public collectionsClient: FakeCollectionsClient = new FakeCollectionsClient();
  public ordersClient: FakeOrdersClient = new FakeOrdersClient();
  public eventsClient: FakeEventsClient = new FakeEventsClient();
  public jobsClient: FakeJobsClient = new FakeJobsClient();
  public accountsClient: FakeAccountsClient = new FakeAccountsClient();
  public videoTypesClient: FakeVideoTypesClient = new FakeVideoTypesClient();
  public ingestVidoesClient: FakeIngestVideosClient = new FakeIngestVideosClient();

  public clear() {
    this.legalRestrictionsClient.clear();
    this.contentPartnersClient.clear();
    this.subjectsClient.clear();
    this.feedsClient.clear();
    this.collectionsClient.clear();
    this.ordersClient.clear();
    this.jobsClient.clear();
    this.eventsClient.clear();
    this.accountsClient.clear();
    this.videoTypesClient.clear();
    this.ingestVidoesClient.clear();
  }
}
