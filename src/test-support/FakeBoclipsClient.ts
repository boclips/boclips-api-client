import { BoclipsClient } from '../BoclipsClient';
import { FakeCollectionsClient } from '../sub-clients/collections/client/FakeCollectionsClient';
import { Clearable } from '../sub-clients/common/utils/Clearable';
import { FakeContentPartnerContractsClient } from '../sub-clients/contentPartnerContracts/client/FakeContentPartnerContractsClient';
import { FakeContentPartnersClient } from '../sub-clients/contentPartners/client/FakeContentPartnersClient';
import { FakeEduAgeRangesClient } from '../sub-clients/educationalAgeRanges/client/FakeEduAgeRangesClient';
import { FakeEventsClient } from '../sub-clients/events/client/FakeEventsClient';
import { FakeIngestVideoStatusesClient } from '../sub-clients/ingestVideoStatuses/client/FakeIngestVideoStatusesClient';
import { FakeJobsClient } from '../sub-clients/jobs/client/FakeJobsClient';
import { FakeLegalRestrictionsClient } from '../sub-clients/legalRestrictions/client/FakeLegalRestrictionsClient';
import { FakeMarketingStatusesClient } from '../sub-clients/marketingStatuses/client/FakeMarketingStatusesClient';
import { FakeOrdersClient } from '../sub-clients/orders/client/FakeOrdersClient';
import { FakeOrganisationsClient } from '../sub-clients/organisations/client/FakeOrganisationClient';
import { FakeSubjectsClient } from '../sub-clients/subjects/client/FakeSubjectsClient';
import { FakeVideoTypesClient } from '../sub-clients/videoTypes/client/FakeVideoTypesClient';
import { FakeBestForTagsClient } from '../sub-clients/bestForTags/client/FakeBestForTagsClient';
import { FakeIngestVideosClient } from '../sub-clients/ingestVideos/client/FakeIngestVideosClient';
import { FakeVideosClient } from '../sub-clients/videos/client/FakeVideosClient';

export class FakeBoclipsClient implements BoclipsClient, Clearable {
  public legalRestrictionsClient: FakeLegalRestrictionsClient = new FakeLegalRestrictionsClient();
  public contentPartnersClient: FakeContentPartnersClient = new FakeContentPartnersClient();
  public contentPartnerContractsClient: FakeContentPartnerContractsClient = new FakeContentPartnerContractsClient();
  public subjectsClient: FakeSubjectsClient = new FakeSubjectsClient();
  public collectionsClient: FakeCollectionsClient = new FakeCollectionsClient();
  public videosClient: FakeVideosClient = new FakeVideosClient();
  public ordersClient: FakeOrdersClient = new FakeOrdersClient();
  public eventsClient: FakeEventsClient = new FakeEventsClient();
  public jobsClient: FakeJobsClient = new FakeJobsClient();
  public organisationsClient: FakeOrganisationsClient = new FakeOrganisationsClient();
  public videoTypesClient: FakeVideoTypesClient = new FakeVideoTypesClient();
  public ingestVidoesClient: FakeIngestVideosClient = new FakeIngestVideosClient();
  public bestForTagsClient: FakeBestForTagsClient = new FakeBestForTagsClient();
  public marketingStatusesClient: FakeMarketingStatusesClient = new FakeMarketingStatusesClient();
  public eduAgeRangesClient: FakeEduAgeRangesClient = new FakeEduAgeRangesClient();
  public ingestVideoStatusesClient: FakeIngestVideoStatusesClient = new FakeIngestVideoStatusesClient();

  public clear() {
    this.legalRestrictionsClient.clear();
    this.contentPartnersClient.clear();
    this.contentPartnerContractsClient.clear();
    this.subjectsClient.clear();
    this.collectionsClient.clear();
    this.videosClient.clear();
    this.ordersClient.clear();
    this.jobsClient.clear();
    this.eventsClient.clear();
    this.organisationsClient.clear();
    this.videoTypesClient.clear();
    this.ingestVidoesClient.clear();
    this.bestForTagsClient.clear();
    this.eduAgeRangesClient.clear();
    this.marketingStatusesClient.clear();
  }
}
