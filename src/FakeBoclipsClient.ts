import { BoclipsClient } from './BoclipsClient';
import { FakeCollectionsClient } from './clients/collections/client/FakeCollectionsClient';
import { Clearable } from './clients/common/utils/Clearable';
import { FakeContentPartnersClient } from './clients/contentPartners/client/FakeContentPartnersClient';
import { FakeHttpFeedsClient } from './clients/httpFeeds/client/FakeHttpFeedsClient';
import { FakeLegalRestrictionsClient } from './clients/legalRestrictions/client/FakeLegalRestrictionsClient';
import { FakeSubjectsClient } from './clients/subjects/client/FakeSubjectsClient';

export class FakeBoclipsClient implements BoclipsClient, Clearable {
  public legalRestrictionsClient: FakeLegalRestrictionsClient = new FakeLegalRestrictionsClient();
  public contentPartnersClient: FakeContentPartnersClient = new FakeContentPartnersClient();
  public subjectsClient: FakeSubjectsClient = new FakeSubjectsClient();
  public feedsClient: FakeHttpFeedsClient = new FakeHttpFeedsClient();
  public collectionsClient: FakeCollectionsClient = new FakeCollectionsClient();

  public clear() {
    this.legalRestrictionsClient.clear();
    this.contentPartnersClient.clear();
  }
}
