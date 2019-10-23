import { BoclipsApiClient } from './BoclipsApiClient';
import { TestContentPartnersController } from './controllers/contentPartners/TestContentPartnersController';
import { TestFeedsController } from './controllers/httpFeeds/TestFeedsController';
import { TestLegalRestrictionsController } from './controllers/legalRestrictions/TestLegalRestrictionsController';
import { TestSubjectsController } from './controllers/subjects/TestSubjectsController';
import { Clearable } from './utils/Clearable';

export class TestBoclipsApiClient implements BoclipsApiClient, Clearable {
  public legalRestrictionsController: TestLegalRestrictionsController = new TestLegalRestrictionsController();
  public contentPartnersController: TestContentPartnersController = new TestContentPartnersController();
  public subjectsController: TestSubjectsController = new TestSubjectsController();
  public feedsController: TestFeedsController = new TestFeedsController();

  public clear() {
    this.legalRestrictionsController.clear();
    this.contentPartnersController.clear();
  }
}
