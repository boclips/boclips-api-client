import { BoclipsClient } from '../BoclipsClient';
import { FakeCollectionsClient } from '../sub-clients/collections/client/FakeCollectionsClient';
import { Clearable } from '../sub-clients/common/utils/Clearable';
import { FakeContentPartnersClient } from '../sub-clients/contentPartners/client/FakeContentPartnersClient';
import { FakeHttpFeedsClient } from '../sub-clients/httpFeeds/client/FakeHttpFeedsClient';
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

  public clear() {
    this.legalRestrictionsClient.clear();
    this.contentPartnersClient.clear();
    this.subjectsClient.clear();
    this.feedsClient.clear();
    this.collectionsClient.clear();
  }
}
