import { BoclipsClient } from '../BoclipsClient';
import { FakeCollectionsClient } from '../sub-clients/collections/client/FakeCollectionsClient';
import { Clearable } from '../sub-clients/common/utils/Clearable';
import { FakeChannelsClient } from '../sub-clients/channels/client/FakeChannelsClient';
import { FakeContractLegalRestrictionsClient } from '../sub-clients/contractLegalRestrictions/client/FakeContractLegalRestrictionsClient';
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
import { FakeSuggestionsClient } from '../sub-clients/suggestions/client/FakeSubjectsClient';
import { FakeContentWarningsClient } from '../sub-clients/contentWarnings/client/FakeContentWarningsClient';
import { FakeContractsClient } from '../sub-clients/contracts/client/FakeContractsClient';
import { FakeShareCodesClient } from '../sub-clients/shareCodes/client/FakeShareCodesClient';

export class FakeBoclipsClient implements BoclipsClient, Clearable {
  public legalRestrictions: FakeLegalRestrictionsClient = new FakeLegalRestrictionsClient();
  public channels: FakeChannelsClient = new FakeChannelsClient();
  public contracts: FakeContractsClient = new FakeContractsClient();
  public subjects: FakeSubjectsClient = new FakeSubjectsClient();
  public collections: FakeCollectionsClient = new FakeCollectionsClient();
  public videos: FakeVideosClient = new FakeVideosClient();
  public orders: FakeOrdersClient = new FakeOrdersClient();
  public events: FakeEventsClient = new FakeEventsClient();
  public jobs: FakeJobsClient = new FakeJobsClient();
  public organisations: FakeOrganisationsClient = new FakeOrganisationsClient();
  public videoTypes: FakeVideoTypesClient = new FakeVideoTypesClient();
  public ingestVidoes: FakeIngestVideosClient = new FakeIngestVideosClient();
  public bestForTags: FakeBestForTagsClient = new FakeBestForTagsClient();
  public marketingStatuses: FakeMarketingStatusesClient = new FakeMarketingStatusesClient();
  public eduAgeRanges: FakeEduAgeRangesClient = new FakeEduAgeRangesClient();
  public ingestVideoStatuses: FakeIngestVideoStatusesClient = new FakeIngestVideoStatusesClient();
  public contractLegalRestrictions: FakeContractLegalRestrictionsClient = new FakeContractLegalRestrictionsClient();
  public suggestions: FakeSuggestionsClient = new FakeSuggestionsClient();
  public contentWarnings: FakeContentWarningsClient = new FakeContentWarningsClient();
  public shareCodes: FakeShareCodesClient = new FakeShareCodesClient();

  public clear() {
    this.legalRestrictions.clear();
    this.channels.clear();
    this.contracts.clear();
    this.subjects.clear();
    this.collections.clear();
    this.videos.clear();
    this.orders.clear();
    this.jobs.clear();
    this.events.clear();
    this.organisations.clear();
    this.videoTypes.clear();
    this.ingestVidoes.clear();
    this.bestForTags.clear();
    this.eduAgeRanges.clear();
    this.marketingStatuses.clear();
    this.contractLegalRestrictions.clear();
    this.suggestions.clear();
    this.contentWarnings.clear();
    this.shareCodes.clear();
  }
}
